import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://akin-news-example.herokuapp.com/api',
});

// GET requests

export const getTopics = () => {
  return newsApi.get('/topics');
};

export const getArticles = () => {
  return newsApi.get('/articles');
};

export const getArticlesByTopic = (topic) => {
  return newsApi.get(`/articles`, { params: { topic } });
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

export const postCommentToArticle = (username, string) => {
  return newsApi.post(`/users/${username}`, {
    body: `${string}`,
    username: `${username}`,
  });
};

// PATCH Requests

export const addKudos = (article_id) => {
  // only want this to be able to run once... How to handle that situation so kudos cant be spammed?
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: 1 });
};

// another patch request has largely the same logic. make that one too, or can this one be reusable?

// DELETE requests

export const deleteCommentById = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};
