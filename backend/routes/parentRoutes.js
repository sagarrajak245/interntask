import express from "express";
import Parent from "../models/parentschema.js";

const router = express.Router();

// Create a new parent
router.post("/", async (req, res) => {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json(parent);
});

// Get all parents
router.get("/", async (req, res) => {
    const parents = await Parent.find();
    res.status(200).json(parents);
});

// Get a parent by ID
router.get("/:id", async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: "Parent not found." });
    res.status(200).json(parent);
});

// Update a parent
router.put("/:id", async (req, res) => {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parent) return res.status(404).json({ message: "Parent not found." });
    res.status(200).json(parent);
});

// Delete a parent
router.delete("/:id", async (req, res) => {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) return res.status(404).json({ message: "Parent not found." });
    res.status(204).send();
});

export default router; 