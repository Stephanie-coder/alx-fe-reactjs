// src/components/Search.jsx
import React, { useState } from "react";
import { fetchAdvancedUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState(""); // keep as string for controlled input
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // user-visible error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    // Avoid totally empty searches
    if (!username.trim() && !location.trim() && !String(minRepos).trim()) {
      setError("Please enter at least one search criterion.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchAdvancedUserData(username, location, minRepos, 1, 10);
      if (!data || data.length === 0) {
        setError("Looks like we cant find the user");
        setResults([]);
      } else {
        setResults(data);
      }
    } catch (err) {
      if (err.message === "rate_limit_exceeded") {
        setError("GitHub rate limit reached. Try again later or use a token.");
      } else {
        setError("Looks like we cant find the user");
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white/5 p-4 rounded-lg shadow-sm space-y-3">
        <div>
          <label htmlFor="username" className="sr-only">GitHub username</label>
          <input
            id="username"
            type="text"
            placeholder="GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="location" className="sr-only">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="minRepos" className="sr-only">Minimum repositories</label>
          <input
            id="minRepos"
            type="number"
            min="0"
            placeholder="Min repositories (optional)"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full p-2 border rounded bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        {!error && !loading && results.length === 0 && (
          <p className="text-gray-400">No results yet — try a search above.</p>
        )}
      </div>

      <ul className="mt-4 space-y-3">
        {results.map((user) => (
          <li key={user.id} className="flex items-center gap-4 p-3 border rounded bg-white/3">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{user.login}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  View Profile
                </a>
              </div>
              {/* note: Search API user items do not include location or repo count; you would need an extra call per user to get full details */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
