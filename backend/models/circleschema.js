import mongoose from "mongoose";

const circleSchema = new mongoose.Schema({
    school: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true, 
    },
    society: {
        type: String,
        default: "",
    },
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
    }],
    is_parent_initiated: {
        type: Boolean,
        default: false, // Indicates if the circle was created by a parent
    },
    is_active: { // Indicates if the circle is active or not
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Circle = mongoose.model("Circle", circleSchema);
export default Circle;
