const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
var Cookies = require("cookies");
const User = require("../models/userModel");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to send token
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  // console.log(res);
  res
    .status(statusCode)
    .cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    })

    .json({
      status: "success",
      token,

      data: {
        user,
      },
    });
};
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    domain: req.body.domain,
    avatar: req.body.avatar,
    available: req.body.available,
    role: req.body.role,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { first_name, last_name, email } = req.body;

  // Check if firstName, lastName, and email were provided
  if (!first_name || !last_name || !email) {
    return next(
      new AppError("Please provide first name, last name, and email!", 400)
    );
  }

  const user = await User.findOne({ first_name, last_name, email });

  if (!user) {
    return next(new AppError("User not found with provided information", 401));
  }
  createSendToken(user, 200, req, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  console.log(req.user, "logg");
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),

    path: "/",
    httpOnly: true,
    sameSite: "None",

    secure: false,
  });
  res.status(200).json({ status: "success" });
};
exports.isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies.jwt, "req.cookies.jwt");
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // Send only the relevant information in the response
      return res.status(200).json({
        status: "success",
        user: currentUser,
        id: decoded.id,
      });
    }
  } catch (err) {
    console.error("Error in isLoggedIn middleware:", err);
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
  // No token or other issues, continue to the next middleware
  next();
};
