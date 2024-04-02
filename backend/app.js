const express = require("express");

// var cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError.js");
const globalErrorHandler = require("./controllers/errorController.js");
// const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const teamRoutes = require("./routes/teamRoutes");

// const reviewRouter = require("./routes/reviewRoutes.js");
const app = express();
app.use(helmet());
app.use(bodyparser.urlencoded({ extended: false }));

const corsOptions = {
  // origin: "https://natours-alpha-nine.vercel.app",
  // origin: "*", // Allow requests from any origin
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use(compression());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(`${__dirname}/public`));

app.use(`/api/v1/users`, userRouter);
app.use("/api/teams", teamRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
