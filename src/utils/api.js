import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://akin-news-example.herokuapp.com/api',
});

// GET requests

export const getTopics = () => {
  return newsApi.get('/topics');
};

export const getArticles = (topic, sort_by) => {
  return newsApi.get(`/articles`, { params: { topic, sort_by } });
};

export const getFilteredArticles = (topic, sort_by) => {
  return newsApi.get(`/articles`, { params: { topic, sort_by } });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

export const getCommentsByArticlesId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`);
};

export const getUsersByUsername = (username) => {
  return newsApi.get(`/users/${username}`);
};

// POST Requests

export const postCommentToArticle = (article_id, username, string) => {
  return newsApi.post(`/articles/${article_id}/comments`, {
    body: `${string}`,
    username: `${username}`,
  });
};

// PATCH Requests

export const castVote = (comment_id, votes) => {
  return newsApi.patch(`/comments/${comment_id}`, { inc_votes: votes });
};

// another patch request has largely the same logic. make that one too, or can this one be reusable?

// DELETE requests

export const deleteCommentById = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};
