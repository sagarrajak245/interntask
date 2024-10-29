import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: function() { return !this.reply_id; },
    },
    reply_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
        required: function() { return !this.post_id; },
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true,
    },
    vote_type: {
        type: String,
        enum: ["up", "down"],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
