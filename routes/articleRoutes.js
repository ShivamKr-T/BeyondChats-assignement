const express = require("express");
const Article = require("../models/Article");

const router = express.Router();

router.get("/", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
});

router.post("/", async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json(article);
});

router.put("/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
