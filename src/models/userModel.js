import { Schema, model, models } from "mongoose";
const bcrypt = require("bcrypt");
const saltRounds = 8;
const userSchema = new Schema({
  userName: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minLength: 7,
  },
  email: {
    required: true,
    type: String,
    minLength: 6,
    unique: true,
  },
  profileImage: {
    type: String,
    default: "https://avatars.jakerunzer.com/asdf",
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
      default: [],
    },
  ],
});
userSchema.pre("save", async function (next) {
  const user = this;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      // Store hash in your password DB.
      user.password = hash;
      next();
    });
  });

  if (
    this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g) == null
  ) {
    throw new Error("Email Validation Failed");
  }

  next();
});
const User = models.User || model("User", userSchema);

export default User;
