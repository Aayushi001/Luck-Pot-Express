var express = require("express");
var router = express.Router();
const Player = require("../models/player");

/* GET users listing. */
router.get("/getAll", function(req, res, next) {
  Player.find()
    .then(data => {
      console.log("get all");
      res.json(data);
    })
    .catch(next);
});

router.get("/getActive", function(req, res, next) {
  Player.find({ isActive: true })
    .then(data => {
      console.log("get Active");

      console.log(data);
      res.json(data);
    })
    .catch(next);
});

router.post("/activate", (req, res, next) => {
  let players = req.body.players;
  console.log(players);
  let playerNames = [];
  for (let i = 0; i < players.length; i++) {
    playerNames.push(players[i]["name"]);
  }
  console.log(playerNames);
  Player.updateMany(
    { name: { $in: playerNames } },
    { $set: { isActive: true } }
  )
    .then(result => {
      if (result) {
        res.json({ code: "okay" });
      } else {
        res.json({ code: "error" });
      }
    })
    .catch(next);
});

router.get("/deactivate", (req, res, next) => {
  Player.updateMany({}, { $set: { isActive: false } })
    .then(result => {
      if (result) {
        res.json({ code: "okay" });
      } else {
        res.json({ code: "error" });
      }
    })
    .catch(next);
});

router.post("/add", (req, res, next) => {
  Player.insertMany(req.body.players)
    .then(result => {
      if (result) {
        res.json({ code: "okay" });
      } else {
        res.json({ code: "error" });
      }
    })
    .catch(next);
});

router.post("/update", (req, res, next) => {
  const players = req.body.players;
  let promises = [];
  for (let i = 0; i < players.length; i++) {
    promises.push(
      Player.findOneAndUpdate(
        { name: players[i]["name"] },
        { $set: { amount: players[i]["amount"] } }
      )
    );
  }
  Promise.all(promises)
    .then(result => {
      if (result) {
        res.json({ code: "okay" });
      } else {
        res.json({ code: "error" });
      }
    })
    .catch(next);
});

module.exports = router;
