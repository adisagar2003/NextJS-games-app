import User from "@/models/userModel";

import connectMongo from "@/utils/connectMongo";
export default async function handler(req, res) {
  await connectMongo();
  if (req.method == "GET") {
    let users = await User.find().limit(10);
    res.status(200).json({ response: "succeess", data: users });
  } else if (req.method == "POST") {
    try {
      const { userName, password, email, profileImage } = req.body;

      const newUser = new User({
        userName: userName,
        password: password,
        email: email,
        profileImage: profileImage,
      });

      let new_user = await newUser.save();
      console.log(new_user);

      await new_user.save();
      res.status(220).json({
        response: "success",
        user: new_user,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  } else if (req.method == "PUT") {
  } else {
  }
}
