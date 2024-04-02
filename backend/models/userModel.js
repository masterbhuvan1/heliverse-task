const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      required: true,
      enum: [
        "Male",
        "Female",
        "Agender",
        "Bigender",
        "Polygender",
        "Genderfluid",
        "Genderqueer",
        "Non-binary",
      ],
    },
    avatar: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      enum: [
        "Business Development",
        "Finance",
        "IT",
        "Management",
        "Marketing",
        "UI Designing",
      ],
    },
    available: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);

module.exports = User;
