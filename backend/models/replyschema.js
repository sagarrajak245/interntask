import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    parent_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true,
    },
    content: {
        type: String, 
        required: true,
    },
    votes: {
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0,
        },
    },
}, { timestamps: true });

const Reply = mongoose.model("Reply", replySchema);
export default Reply;
