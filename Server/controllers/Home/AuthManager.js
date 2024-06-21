import User from "../../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    res.status(400).json({ message: "Please provide all fields." });

  // password encryption
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) res.status(200).json({ message: "Registration Successfull." });
  else
    res
      .status(400)
      .json({ message: "Some error occured please try again later." });
};

// to login a user
export const login = async (req, res) => {
  const { username, password } = req.body;
  const isUser = await User.findOne({ username });
  if (!isUser) res.status(400).json({ message: "Invalid username." });
  else {
    const isValid = await bcryptjs.compare(password, isUser.password);
    if (isValid) {
      res.status(200).json({
        id: isUser._id,
        // token: generateToken(isUser._id, isUser.role),
      });
    } else res.status(400).json({ message: "Incorrect password" });
  }
};
