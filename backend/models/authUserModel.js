import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true 
      },
      email:  {
        type: String, 
        required: true, 
        unique: true
      },
      password: {
        type: String, 
        required: [true,"Password is required"], 
        unique: true
      },
      address: {
        type: {},
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      role: {
        type: Number,
        default: 0,
      },
    },
    {timestamps: true}
);

export default mongoose.model("User", User);

