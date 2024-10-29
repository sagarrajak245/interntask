import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  child_school: {
    type: String,
    required: true,
  },
  child_class: {
    type: String,
    required: true,
  },
  child_section: {
    type: String,
    required: true,
  },
  society: {
    type: String,
    default: "",
  },
  circle_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circle",
    default: [],
  }],
  posts: [{
    type: String,
    default: [],
  }],
}, { timestamps: true });

const Parent = mongoose.model("Parent", parentSchema);
export default Parent;
