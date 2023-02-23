import connectMongo from "@/utils/connectMongo";
import { withIronSessionApiRoute } from "iron-session/next";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import User from "@/models/userModel";
export default withIronSessionApiRoute(
  async function handler(req, res) {
    console.log(req.body, "req body");
    await connectMongo();
    try {
      if (req.method == "POST") {
        const userData = {
          userName: req.body.userName,
          password: req.body.password,
          email: req?.body?.email,
        };
        console.log(userData);

        var user = await User.findOne({ userName: userData.userName });
        console.log(user, "THis is users");

        if (user) {
          console.log("comparing...");
          const result = await bcrypt.compare(userData.password, user.password);
          console.log(result);
          console.log(user.password);
          if (result) {
            let token = jwt.sign(user.id, process.env.NEXT_PUBLIC_JWT);
            req.session.user = {
              id: user._id,
              userName: user.name,
              email: user.email,
              profile_picture: user.profileImage,
            };

            await req.session.save();
            res.status(220).json({
              token: token,
              userData: {
                userName: user.name,
                email: user.email,
                profile_picture: user.profileImage,
                id: user._id,
              },
            });
          } else {
            res.status(400).json({
              error: "incorrect password ",
            });
          }
        } else {
          res.status(400).json({
            data: "Data",
          });
        }
      } else {
        res.status(400).json({
          data: "Hello",
        });
      }
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },
  {
    cookieName: "access_token",
    password: process.env.NEXT_PUBLIC_COOKIE_SECRET,
  }
);
