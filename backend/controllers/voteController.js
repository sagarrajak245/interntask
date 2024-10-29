import Parent from "../models/parentschema.js";
import Vote from "../models/voteschema.js"; 

// Vote on a Post or Reply
export const voteOnPostOrReply = async (req, res) => {
    const { post_id, reply_id, parent_id, vote_type } = req.body;

    const parent = await Parent.findById(parent_id);
    if (!parent) {
        return res.status(404).json({ message: "Parent not found." });
    }

    const vote = new Vote({ post_id, reply_id, parent_id, vote_type });
    await vote.save();
    res.status(201).json(vote);
};

// Get all votes
export const getAllVotes = async (req, res) => {
    const votes = await Vote.find();
    res.status(200).json(votes);
};

// Get a vote by ID
export const getVoteById = async (req, res) => {
    const vote = await Vote.findById(req.params.id);
    if (!vote) return res.status(404).json({ message: "Vote not found." });
    res.status(200).json(vote);
};

// Delete a vote
export const deleteVote = async (req, res) => {
    const vote = await Vote.findByIdAndDelete(req.params.id);
    if (!vote) return res.status(404).json({ message: "Vote not found." });
    res.status(204).send();
}; 