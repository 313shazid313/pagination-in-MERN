const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/pagination")
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.error(error);
  });

const postSchema = new mongoose.Schema({
  text: String,
  title: String,
});

const Post = mongoose.model("Post", postSchema);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const nunberOfContent = 3;
  const page = parseInt(req.query.page || "0");
  const total = await Post.countDocuments({});
  const posts = await Post.find({})
    .limit(nunberOfContent)
    .skip(nunberOfContent * page);
  res.json({
    totalPages: Math.ceil(total / nunberOfContent),
    posts,
  });
});

const db = mongoose.connection;

db.once("open", () => {
  app.listen(4000);
});
