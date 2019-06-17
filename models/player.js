"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const playerSchema = new Schema({
  name: { type: String, unique: true, ordered: false },
  amount: Number,
  isActive: Boolean
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
