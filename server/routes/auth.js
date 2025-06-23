import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_token";

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({username, password: hashed});
        res.json({success: true, user});
    } catch(err) {
        res.status(400).json({error: "Username token invalid", message: err.message});
    }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, username: user.username });
});


router.get("/verify", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error: "No Token"});

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({valid: true, id: decoded.id});
    } catch(err) {
        res.status(401).json({error: "Invalid token", message: err.message});
    }
});

export default router;