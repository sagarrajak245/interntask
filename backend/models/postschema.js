import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    circle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Circle",
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
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    replies: [{
        _id: mongoose.Schema.Types.ObjectId,
        parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parent",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        replies: [{
            _id: mongoose.Schema.Types.ObjectId,
            parent_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Parent",
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            created_at: {
                type: Date,
                default: Date.now,
            },
        }]
    }],
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;

