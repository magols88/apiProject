var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var db = require("./models");
db.sequelize.sync({ force: false });

var indexRouter = require("./routes/index");
var addRouter = require("./routes/add");
var subtractRouter = require("./routes/subtract");
var multiplyRouter = require("./routes/multiply");
var divideRouter = require("./routes/divide");
var authRouter = require("./routes/auth");
var previousRouter = require("./routes/previous");
var sqrtRouter = require("./routes/sqrt");

var app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
app.use("/doc", swaggerUi.serve);
app.get("/doc", swaggerUi.setup(swaggerDocument));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/add", addRouter);
app.use("/subtract", subtractRouter);
app.use("/multiply", multiplyRouter);
app.use("/divide", divideRouter);
app.use("/previous", previousRouter);
app.use("/sqrt", sqrtRouter);

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
