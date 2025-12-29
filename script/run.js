require("dotenv").config();

const axios = require("axios");
const searchGoogle = require("./googleSearch");
const scrapeContent = require("./scrapeContent");
const rewrite = require("./rewriteArticle");

(async () => {
  try {
    // 1. Fetch original articles
    const res = await axios.get("http://localhost:5000/articles");
    const articles = res.data.filter(a => !a.isUpdated);

    console.log("Articles to update:", articles.length);

    for (let article of articles) {
      console.log("Updating:", article.title);

      // 2. Mock Google search
      const links = await searchGoogle(article.title);

      // 3. Scrape reference content
      const ref1 = await scrapeContent(links[0]);
      const ref2 = await scrapeContent(links[1]);

      // 4. Rewrite using Mock LLM
      const updatedContent = await rewrite(
        article.content,
        ref1,
        ref2
      );

      // 5. UPDATE existing article (IMPORTANT)
      await axios.put(
        `http://localhost:5000/articles/${article._id}`,
        {
          content: updatedContent,
          isUpdated: true,
          references: links
        }
      );

      console.log("Updated successfully:", article.title);
    }

    console.log("Automation finished");
  } catch (err) {
    console.error("Automation error:", err.message);
  }
})();
