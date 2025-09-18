// src/services/githubService.js
import axios from "axios";

const BASE_URL = "https://api.github.com";

/**
 * Perform an advanced user search on GitHub.
 * Returns an array of user objects (response.data.items).
 *
 * @param {string} username - username or part of username (optional)
 * @param {string} location - location qualifier (optional)
 * @param {string|number} minRepos - minimum public repos (optional)
 * @param {number} page - pagination page (optional, default 1)
 * @param {number} per_page - results per page (optional, default 10)
 */
export async function fetchAdvancedUserData(
  username = "",
  location = "",
  minRepos = "",
  page = 1,
  per_page = 10
) {
  // Build query parts safely
  const parts = [];

  const u = String(username || "").trim();
  const loc = String(location || "").trim();
  const minR = minRepos === "" || minRepos === null ? "" : String(minRepos).trim();

  if (u) {
    // Search username in login (keeps results relevant)
    parts.push(`${u} in:login`);
  }
  if (loc) {
    parts.push(`location:${loc}`);
  }
  if (minR) {
    const n = Number(minR);
    if (!Number.isNaN(n) && n >= 0) {
      parts.push(`repos:>=${n}`);
    }
  }

  // If nothing provided, return empty array early
  if (parts.length === 0) {
    return [];
  }

  const q = parts.join(" ");

  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q,
        per_page,
        page,
      },
    });

    // response.data.items is an array of user summaries
    return response.data.items || [];
  } catch (err) {
    // Give useful error messages for common cases
    if (err.response && err.response.status === 403) {
      throw new Error("rate_limit_exceeded");
    }
    throw new Error("search_failed");
  }
}

