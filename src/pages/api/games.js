import Game from "@/models/gameModel";
import connectMongo from "@/utils/connectMongo";
const mongoose = require("mongoose");

export default async function handler(req, res) {
  await connectMongo();
  if (req.method == "GET") {
    const games = await Game.find().limit(20);
    res.status(200).json({ response: "succeess", data: games });
  } else {
  }

  if (req.method=="POST"){
    await connectMongo();
    const {title, thumbnail, short_description, game_url, genre, platform, publisher, developer, freetogame_profile_url} = req.body;
    const gameData ={
      title: title,
  thumbnail: thumbnail,
  short_description: short_description,
  game_url: game_url,
  genre: genre,
  platform: platform,
  publisher: publisher,
  developer: developer,
  freetogame_profile_url: freetogame_profile_url,
    }

    const game = new Game(gameData);
    await game.save();
    res.status(200).json({response:'success', data:game});
  }
}
