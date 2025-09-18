import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() && !location.trim() && !minRepos.trim()) return;

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const data = await fetchUserData(username, location, minRepos);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Looks like we can't find the user(s).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"
      >
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Username
          </label>
          <input
            type="text"
            placeholder="e.g. torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g. Kenya"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Min Repos
          </label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4 sm:flex sm:justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition-all"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {loading && <p className="text-blue-600 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <img
                src={u.avatar_url}
                alt={u.login}
                className="w-20 h-20 rounded-full mb-2 object-cover"
              />
              <h3 className="font-semibold text-gray-800">{u.login}</h3>
              <a
                href={u.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline mt-1"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

