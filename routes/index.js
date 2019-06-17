var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/getTested", function(req, res, next) {
  console.log("Test done");
  res.json({ code: "okay" });
});

module.exports = router;
