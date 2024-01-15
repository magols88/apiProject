var express = require("express");
var jsend = require("jsend");
var router = express.Router();
var db = require("../models");
var ResultService = require("../services/ResultService");
var resultService = new ResultService(db);
var jwt = require("jsonwebtoken");

router.use(jsend.middleware);

router.get("/:number1", function (req, res, next) {
  const number1 = parseInt(req.params.number1);
  if (isNaN(number1)) {
    return res.jsend.fail({ number1: "number is not in correct format" });
  }
  if (number1 < 0) {
    return res.jsend.fail({ number1: "number cannot be negative" });
  }
  const result = Math.sqrt(number1); // square root
  const token = req.headers.authorization?.split(" ")[1]; // ? is optional chaining operator
  if (token) {
    // if token exists
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // verify token
      resultService.create("sqrt", Math.round(result), decodedToken.id); // create result
    } catch (err) {
      // if token is invalid
      if (Number.isInteger(result)) {
        // if result is an integer
        res.jsend.success({ result: result, error: err }); // return result and error
      } else {
        res.jsend.success({
          // return rounded result and error
          result: Math.round(result),
          error: err,
          message: "Result has been rounded, as it was not an integer.",
        });
      }
    }
  }
  if (Number.isInteger(result)) {
    res.jsend.success({ result: result });
  } else {
    res.jsend.success({
      result: Math.round(result),
      message: "Result has been rounded, as it was not an integer.",
    });
  }
});

module.exports = router;
