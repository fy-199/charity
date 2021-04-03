var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/auth.routes");
var usersRouter = require("./routes/user.routes");
var addressesRouter = require("./routes/address.routes");
var donationsRouter = require("./routes/donation.routes");
var donateGoodsRouter = require("./routes/donate-good.routes");
var mediasRouter = require("./routes/media.routes");
var postsRouter = require("./routes/post.routes");
var involvementsRouter = require("./routes/involvement.routes");
var involvementsReqRouter = require("./routes/involvement-req.routes");

var app = express();
//db connect
const db = require("./helpers/db")();

const { verifyToken } = require("./middlewares");
const config = require("./config");
app.set("api_secret_key", config.api_secret_key);

// cors
let corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000", //This is for frontend
  // credentials: true,
  // optionsSuccessStatus: 200, // For legacy browser support
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors(corsOptions));
app.use("/", indexRouter);
app.use("/api", verifyToken.verifyToken);
app.use("/users", usersRouter);
app.use("/addresses", addressesRouter);
app.use("/donations", donationsRouter);
app.use("/goods-donation", donateGoodsRouter);
app.use("/medias", mediasRouter);
app.use("/posts", postsRouter);
app.use("/involvements", involvementsRouter);
app.use("/involvements-req", involvementsReqRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
