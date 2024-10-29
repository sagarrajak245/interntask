import express from "express";
import Parent from "./models/Parent";
import Post from "./models/Post";
import Reply from "./models/Reply";
import Vote from "./models/Vote";

const router = express.Router();

// Create a Post
router.post("/posts", async (req, res) => {
    const { circle_id, parent_id, content } = req.body;

    const parent = await Parent.findById(parent_id);
    if (!parent || !parent.circle_ids.includes(circle_id)) {
        return res.status(403).json({ message: "You are not a member of this circle." });
    }

    const post = new Post({ circle_id, parent_id, content });
    await post.save();
    res.status(201).json(post);
});

// Reply to a Post
router.post("/replies", async (req, res) => {
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
});

// Vote on a Post or Reply
router.post("/votes", async (req, res) => {
    const { post_id, reply_id, parent_id, vote_type } = req.body;

    const parent = await Parent.findById(parent_id);
    if (!parent) {
        return res.status(404).json({ message: "Parent not found." });
    }

    const vote = new Vote({ post_id, reply_id, parent_id, vote_type });
    await vote.save();
    res.status(201).json(vote);
});

export default router;
