import { Schema, model, models } from "mongoose";

const gameSchema = new Schema({
  title: String,
  thumbnail: String,
  short_description: String,
  game_url: String,
  genre: String,
  platform: String,
  publisher: String,
  developer: String,
  freetogame_profile_url: String,
});

const Game = models.Game || model("Game", gameSchema);

export default Game;
