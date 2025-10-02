import express from "express";
import dotenv from "dotenv";
import connectDB from './Config/mongoDBConnection.ts';

// Routes
import productRoutes from './Routes/productRoutes.ts';
import userRoutes from './Routes/userRoutes.ts';
import cartRoutes from './Routes/cartRoutes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // מאפשר לפרסר JSON בבקשות

// קודם נתחבר למסד הנתונים
connectDB().then(() => {
  // Base Routes – רק אחרי החיבור ל-MongoDB
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/carts", cartRoutes);

  // Route בסיסי לבדיקה
  app.get("/", (req, res) => {
    res.send("🚀 השרת רץ והחיבור ל-MongoDB הצליח!");
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ Error connecting to MongoDB:", err);
});
