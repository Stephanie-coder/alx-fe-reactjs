import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' }
});

export const searchUsers = (q) => githubApi.get('/search/users', { params: { q } });

export default githubApi;
