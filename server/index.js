import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express(); 
const PORT = 5000;

app.use(cors());
app.use(express.json()); 
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
// eslint-disable-next-line no-undef
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Search + Get Products Route
app.get("/api/products", async (req, res) => {
  const search = req.query.search?.trim();

  let query = {};
  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    };
  }

  console.log("🔍 Mongo Query:", query);

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use("/uploads", express.static("uploads"));
