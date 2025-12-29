require("dotenv").config();

const axios = require("axios");
const searchGoogle = require("./googleSearch");
const scrapeContent = require("./scrapeContent");
const rewrite = require("./rewriteArticle");

(async () => {
  try {
    const res = await axios.get("http://localhost:5000/articles");
    const articles = res.data.filter(a => !a.isUpdated);

    console.log("Articles to update:", articles.length);

    for (const article of articles) {
      console.log("Updating:", article.title);

      const links = await searchGoogle(article.title);

      const ref1 = await scrapeContent(links[0]);
      const ref2 = await scrapeContent(links[1]);

      // 🔥 IMPORTANT: capture return value
      const updatedText = await rewrite(
        article.originalContent,
        ref1,
        ref2
      );

      console.log("Updated content length:", updatedText.length);

      // 🔥 IMPORTANT: write to updatedContent
      await axios.put(
        `http://localhost:5000/articles/${article._id}`,
        {
          updatedContent: updatedText,
          isUpdated: true,
          references: links
        }
      );

      console.log("Saved updated version for:", article.title);
    }

    console.log("Automation finished successfully");
  } catch (err) {
    console.error("Automation error:", err.message);
  }
})();
