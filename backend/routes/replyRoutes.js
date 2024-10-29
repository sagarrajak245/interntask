import express from "express";
import {
    replyToPost,
    getRepliesForPost,
    updateReply,
    deleteReply
} from "../controllers/replyController.js";

const router = express.Router();

router.post("/", replyToPost);
router.get("/:id/replies", getRepliesForPost);
router.put("/replies/:id", updateReply);
router.delete("/replies/:id", deleteReply);

export default router; 