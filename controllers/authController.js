const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.User.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signUp in user" });
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.User.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    console.log(user);
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (erorr) {
    console.error(erorr);
    res.status(500).json({ message: "Error logging in user" });
  }
};

module.exports = { login, signup };
