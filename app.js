require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000;
const goalRouter = require("./routes/goalRouter");

// middlewares are functions that runs on the server between the requests and response
app.use(express.json())
app.use(cors())

// home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to GOAL api",
  });
});
app.use("/goals", goalRouter);

// error route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource Not Found",
  });
});
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "goals"
    });
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectToDB();
