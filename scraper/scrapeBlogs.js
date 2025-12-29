const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

async function scrapeBlogs() {
  const url = "https://beyondchats.com/blogs/";
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const articles = [];

  $(".blog-item").slice(-5).each((i, el) => {
    const title = $(el).find("h2").text().trim();
    const link = $(el).find("a").attr("href");

    articles.push({
      title,
      sourceUrl: link,
      content: "Will be filled later"
    });
  });

  await Article.insertMany(articles);
  console.log("Articles saved");
}

module.exports = scrapeBlogs;
