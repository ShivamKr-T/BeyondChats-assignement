import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => setArticles(res.data));
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>BeyondChats Articles</h1>

      {articles.map((article) => (
        <div key={article._id} style={styles.card}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>{article.title}</h2>

            <span
              style={{
                ...styles.badge,
                backgroundColor: article.isUpdated ? "#16a34a" : "#2563eb",
              }}
            >
              {article.isUpdated ? "Updated" : "Original"}
            </span>
          </div>

          {/* ORIGINAL */}
          <div style={styles.section}>
            <h4 style={styles.subHeading}>Original Version</h4>
            <p style={styles.content}>
              {expanded[article._id]
                ? article.originalContent
                : article.originalContent?.slice(0, 400) + "..."}
            </p>
          </div>

          {/* UPDATED */}
          {article.isUpdated && article.updatedContent && (
            <div style={styles.section}>
              <h4 style={{ ...styles.subHeading, color: "#16a34a" }}>
                Updated Version
              </h4>
              <p style={styles.content}>
                {expanded[article._id]
                  ? article.updatedContent
                  : article.updatedContent.slice(0, 400) + "..."}
              </p>
            </div>
          )}

          <button
            style={styles.button}
            onClick={() => toggleExpand(article._id)}
          >
            {expanded[article._id] ? "Show Less" : "Read More"}
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#bcd1e5ff",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Inter, Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#ffffff",
    maxWidth: "900px",
    margin: "0 auto 30px auto",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    gap: "15px",
  },
  title: {
    fontSize: "22px",
    color: "#020617",
    margin: 0,
  },
  badge: {
    padding: "6px 14px",
    borderRadius: "999px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  section: {
    marginBottom: "15px",
  },
  subHeading: {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#334155",
  },
  content: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#475569",
    whiteSpace: "pre-line",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default App;
