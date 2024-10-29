import Circle from "./models/circleschema.js";
import Parent from "./models/parentschema.js";


// Function to move a parent from one circle to another
async function handleGradeAdvancement(parentId, oldCircleId, newCircleId) {
    // Input validation
    if (!parentId || !oldCircleId || !newCircleId) {
        throw new Error("Missing required parameters");
    }

    try {
        // Find all required documents in parallel
        const [parent, oldCircle, newCircle] = await Promise.all([
            Parent.findById(parentId),
            Circle.findById(oldCircleId),
            Circle.findById(newCircleId)
        ]);

        // Validate existence of all required documents
        if (!parent) {
            throw new Error(`Parent with ID ${parentId} not found`);
        }
        if (!oldCircle) {
            throw new Error(`Old circle with ID ${oldCircleId} not found`);
        }
        if (!newCircle) {
            throw new Error(`New circle with ID ${newCircleId} not found`);
        }

        // Execute updates in parallel
        await Promise.all([
            Circle.findByIdAndUpdate(
                oldCircleId,
                { $pull: { parents: parentId } },
                { new: true }
            ),
            Circle.findByIdAndUpdate(
                newCircleId, 
                { $push: { parents: parentId } },
                { new: true }
            )
        ]);

        return {
            success: true,
            message: `Successfully moved parent ${parentId} from circle ${oldCircleId} to ${newCircleId}`
        };

    } catch (error) {
        const errorMessage = `Failed to update parent circles: ${error.message}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}

export default handleGradeAdvancement;