import Parent from "../models/parentschema.js";
import Post from "../models/postschema.js";

// Create a Post
export const createPost = async (req, res) => {
    const { circle_id, parent_id, content } = req.body;

    const parent = await Parent.findById(parent_id);
    if (!parent || !parent.circle_ids.includes(circle_id)) {
        return res.status(403).json({ message: "You are not a member of this circle." });
    }

    const post = new Post({ circle_id, parent_id, content });
    await post.save();
    res.status(201).json(post);
};

// Get all posts
export const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
};

// Get a post by ID
export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.status(200).json(post);
};

// Update a post
export const updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.status(200).json(post);
};

// Delete a post
export const deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.status(204).send();
}; 