const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const movieRoute = require("./routes/movies");
const connectDB = require("./utils/db");

dotenv.config();
connectDB();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("movies/api/movies", movieRoute);

app.listen(process.env.PORT || 3007, () => {
  console.log("Backend server is running!");
});