const express = require("express");
// const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();
router.post("/isLoggedIn", authController.isLoggedIn);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.route("/").get(userController.getAllUsers);
// .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
