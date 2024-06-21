import User from "../../models/UserModel.js";

const emailExists = async (req, res) => {
  const email = req.body.email;
  try {
    const emailExists = await User.find({ email });
    if (emailExists.length > 0) {
      res.status(200).json({ message: "Email aready exists." });
    } else res.status(200).json({ message: "" });
  } catch (error) {
    console.error("Error querying database:", error);
  }
};

const usernameExists = async (req, res) => {
  const username = req.body.username;
  try {
    const usernameExists = await User.find({ username });
    if (usernameExists.length > 0) {
      res.status(200).json({ message: "Username aready exists." });
    } else res.status(200).json({ message: "" });
  } catch (error) {
    console.error("Error querying database:", error);
  }
};

export { emailExists, usernameExists };
