import express from "express";
import dotenv from "dotenv";
import connectDB from './Config/mongoDBConnection.ts'
// import connectDB from './Config/mongoDBConnection.ts'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// קודם נתחבר למסד הנתונים
connectDB().then(() => {
  // רק אחרי שהחיבור הצליח – נפעיל את השרת
  app.get("/", (req, res) => {
    res.send("🚀 השרת רץ והחיבור ל-MongoDB הצליח!");
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
