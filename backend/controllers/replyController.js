import Post from "../models/postschema.js"; 
import Reply from "../models/replyschema.js"; 

// Reply to a Post
export const replyToPost = async (req, res) => {
    const { parent_post_id, parent_id, content } = req.body;

    const post = await Post.findById(parent_post_id);
    if (!post) {
        return res.status(404).json({ message: "Post not found." });
    }

    const reply = new Reply({ parent_post_id, parent_id, content });
    await reply.save();
    post.replies.push(reply._id);
    await post.save();

    res.status(201).json(reply);
};

// Get all replies for a post
export const getRepliesForPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('replies');
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.status(200).json(post.replies);
};

// Update a reply
export const updateReply = async (req, res) => {
    const reply = await Reply.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reply) return res.status(404).json({ message: "Reply not found." });
    res.status(200).json(reply);
};

// Delete a reply
export const deleteReply = async (req, res) => {
    const reply = await Reply.findByIdAndDelete(req.params.id);
    if (!reply) return res.status(404).json({ message: "Reply not found." });
    res.status(204).send();
}; 