import express from "express";
import Circle from "./models/circleschema.js"; 
import Parent from "./models/parentschema.js"; 

const router = express.Router();

// Create a Parent-Initiated Circle
router.post("/circles", async (req, res) => {
    const { school, class: className, section, society, parent_id, is_parent_initiated, is_opt_in } = req.body;

    // Input validation
    if (!school || !className || !section || !parent_id) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if the parent exists
    const parent = await Parent.findById(parent_id);
    if (!parent) {
        return res.status(404).json({ message: "Parent not found." });
    }

    // Create the circle
    const circle = new Circle({
        school,
        class: className,
        section,
        society,
        is_parent_initiated,
        is_opt_in
    });

    circle.parents.push(parent_id); // Add the parent as a member
    await circle.save();

    res.status(201).json(circle);
});

export default router; 