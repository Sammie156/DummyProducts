import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/api/products", async (req, res) => {
  try {
    const search = req.query.search || "";

    // Find products where name or description contains the search keyword (case-insensitive)
    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });

    res.json(products);
    console.log(products);
  } catch (err) {
    console.error("Error fetching the products ", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
