const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    team_name: {
      type: String,
      required: [true, "Please provide a team name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a team description"],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "Please provide the user who created the team"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
