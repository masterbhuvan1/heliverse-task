const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Team = require("../models/teamModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.createTeam = catchAsync(async (req, res, next) => {
  const { team_name, description, members, created_by } = req.body;

  if (!members || !members.length) {
    return res
      .status(400)
      .send({ message: "Please provide at least one member." });
  }

  const memberDomains = await User.find({
    _id: { $in: members },
  }).select("domain -_id");

  const domains = memberDomains.map((user) => user.domain);
  const uniqueDomains = [...new Set(domains)];

  if (domains.length !== uniqueDomains.length) {
    return res
      .status(400)
      .send({ message: "All team members must have unique domains." });
  }
  const team = await Team.create({
    team_name,
    description,
    members,
    created_by,
    active: true,
  });
  res.status(201).json({
    status: "success",
    data: {
      team,
    },
  });
});
exports.displayTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id; // Assuming the ID is passed as a URL parameter

  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).send({ message: "Invalid team ID." });
  }

  const team = await Team.findById(teamId).populate({
    path: "members",
    select: "first_name last_name email domain", // Adjust according to your User schema
  });

  if (!team) {
    return res.status(404).send({ message: "No team found with that ID." });
  }

  res.status(200).json({
    status: "success",
    data: {
      team,
    },
  });
});

exports.getAllTeams = factory.getAll(Team);
