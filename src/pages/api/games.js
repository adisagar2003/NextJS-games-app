import Game from "@/models/gameModel";
import connectMongo from "@/utils/connectMongo";
const mongoose = require("mongoose");

export default async function handler(req, res) {
  await connectMongo();
  if (req.method == "GET") {
    console.log(req.params);
    const games = await Game.find().limit(20);
    res.status(200).json({ response: "succeess", data: games });
  } else {
  }
}
