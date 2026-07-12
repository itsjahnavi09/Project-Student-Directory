const studentRoutes = require("./routes/studentRoutes");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
console.log("Mongo URI loaded:", process.env.MONGO_URI);
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student Directory API is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});