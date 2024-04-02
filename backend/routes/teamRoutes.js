const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/:id", teamController.displayTeam);
router.post("/createTeam", teamController.createTeam);
router.get("/", teamController.getAllTeams);
module.exports = router;
