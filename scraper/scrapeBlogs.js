require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected (Scraper)"))
  .catch(err => console.error(err));

async function scrapeBlogs() {
  console.log("Starting blog scrape...");

  const url = "https://beyondchats.com/blogs/";
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const linksSet = new Set();

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("/blogs/") && href.split("/").length > 2) {
      linksSet.add("https://beyondchats.com" + href);
    }
  });

  const blogLinks = Array.from(linksSet).slice(-5); // last 5 = oldest

  console.log("Found blog links:", blogLinks.length);

  const articles = [];

  for (let link of blogLinks) {
    try {
      const page = await axios.get(link);
      const $$ = cheerio.load(page.data);

      const title =
        $$("h1").first().text().trim() ||
        $$("title").text().trim();

      const content = $$("p")
        .map((_, p) => $$(p).text())
        .get()
        .join("\n");

      if (title) {
        articles.push({
            title,
            originalContent: content,
            updatedContent: "",
            sourceUrl: link,
            isUpdated: false
        });

      }
    } catch (err) {
      console.error("Failed to scrape:", link);
    }
  }

  if (articles.length > 0) {
    await Article.insertMany(articles);
  }

  console.log("Scraped and saved", articles.length, "articles");
  process.exit(0);
}

scrapeBlogs();
