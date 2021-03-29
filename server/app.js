var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/auth.routes");
var usersRouter = require("./routes/user.routes");
var addressesRouter = require("./routes/address.routes");
var donationsRouter = require("./routes/donation.routes");
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
// swagger

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", verifyToken.verifyToken);
app.use("/api/users", usersRouter);
app.use("/api/addresses", addressesRouter);
app.use("/api/donations", donationsRouter);
app.use("/api/medias", mediasRouter);
app.use("/posts", postsRouter);
app.use("/api/involvements", involvementsRouter);
app.use("/api/involvements-req", involvementsReqRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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