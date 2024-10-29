import express from "express";
import router from "../controllers/Q3_b_parentinitiated.js"; // Import the controller

// Use the existing router from the controller
// Route to create a parent-initiated circle
router.post("/circles", async (req, res) => {
    // Delegate the request to the controller's logic
    await router.handleCircleCreation(req, res);
});

export default router; 