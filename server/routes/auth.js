import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import multer from "multer";
import path from "path";

const router = express.Router();
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET || "secret_token";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ),
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("profilePic"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  console.log("✅ File saved as:", imageUrl);
  res.json({ imageUrl });
});

router.post("/register", async (req, res) => {
  const { username, password, address, profilePicUrl } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      address,
      profilePicUrl,
    });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Registration Error:", err); // ✅ LOG the exact error
    res
      .status(400)
      .json({ error: "Registration failed", message: err.message });
  }
});

router.put("/profile/:id", async (req, res) => {
  const { profilePicUrl } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { profilePicUrl },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  if (!token) return res.status(401).json({ error: "No Token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, id: decoded.id });
  } catch (err) {
    res.status(401).json({ error: "Invalid token", message: err.message });
  }
});

export default router;
