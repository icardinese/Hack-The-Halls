import React, { useState } from "react";
import axios from "axios";
import "./GiftSuggestions.css";

const GiftSuggestions = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        query,
      });
      setResults(response.data.results || []);
      if (!response.data.results?.length) {
        setError("No gift suggestions found. Try a different search query!");
      }
    } catch (err) {
      console.error("Error fetching gift suggestions:", err);
      setError("Failed to fetch gift suggestions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gift-suggestions-container">
      {/* Header */}
      <h1 className="title">🎁 Gift Suggestions</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for amazing gift ideas..."
          className="search-input"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`search-button ${isLoading ? "loading" : ""}`}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Search Results */}
      <div className="results-grid">
        {results.map((result, index) => (
          <div
            key={index}
            className="result-card"
            style={{
              animationDelay: `${index * 0.1}s`, // Stagger the animations
            }}
          >
            {/* Thumbnail */}
            {result.pagemap?.cse_thumbnail && (
              <img
                src={result.pagemap.cse_thumbnail[0]?.src}
                alt={result.title}
                className="result-thumbnail"
              />
            )}

            {/* Title */}
            <h2 className="result-title">{result.title}</h2>

            {/* Snippet */}
            <p className="result-snippet">{result.snippet}</p>

            {/* Link */}
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="view-button"
            >
              View Gift
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftSuggestions;
