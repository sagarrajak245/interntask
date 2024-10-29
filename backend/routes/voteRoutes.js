import express from "express";
import {
    deleteVote,
    getAllVotes,
    getVoteById,
    voteOnPostOrReply
} from "../controllers/voteController.js";

const router = express.Router();

router.post("/", voteOnPostOrReply);
router.get("/", getAllVotes);
router.get("/:id", getVoteById);
router.delete("/:id", deleteVote);

export default router; 