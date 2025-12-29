const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));
mongoose.set("bufferCommands", false);


app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/articles", require("./routes/articleRoutes"));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
