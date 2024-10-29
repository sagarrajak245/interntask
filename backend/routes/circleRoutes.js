import express from "express";
import CircleController from "../controllers/Q4_discoverable.js"; // Import the CircleController

const router = express.Router();

// Create a new circle
router.post("/", async (req, res) => {
    const circle = new Circle(req.body);
    await circle.save();
    res.status(201).json(circle);
});

// Get all circles
router.get("/", async (req, res) => {
    const circles = await Circle.find();
    res.status(200).json(circles);
});

// Get a circle by ID
router.get("/:id", async (req, res) => {
    const circle = await Circle.findById(req.params.id);
    if (!circle) return res.status(404).json({ message: "Circle not found." });
    res.status(200).json(circle);
});

// Update a circle
router.put("/:id", async (req, res) => {
    const circle = await Circle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!circle) return res.status(404).json({ message: "Circle not found." });
    res.status(200).json(circle);
});

// Delete a circle
router.delete("/:id", async (req, res) => {
    const circle = await Circle.findByIdAndDelete(req.params.id);
    if (!circle) return res.status(404).json({ message: "Circle not found." });
    res.status(204).send();
});


// Route to get discoverable circles for a parent
router.get("/discoverable", CircleController.getDiscoverableCircles);



export default router; 