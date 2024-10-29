import express from "express";
import handleGradeAdvancement from "../controllers/Q3_a_advancement.js"; // Import the controller

const router = express.Router();

// Route to move a parent from one circle to another
router.post("/move-parent", async (req, res) => {
    const { parentId, oldCircleId, newCircleId } = req.body;

    try {
        const result = await handleGradeAdvancement(parentId, oldCircleId, newCircleId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router; 