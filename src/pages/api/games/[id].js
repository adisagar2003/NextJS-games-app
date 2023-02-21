import { model } from "mongoose";

const { default: Game } = require("@/models/gameModel");

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    console.log(id, "req.quert");
    const game = await Game.findById(req.query.id);
    res.json({
      Game: game,
      response: "success",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}
