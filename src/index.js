import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
} catch (error) {
  console.log("MongoDB connection failed:", error.message);
  process.exit(1);
}
