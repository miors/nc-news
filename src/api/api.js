import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-mior.onrender.com/api",
});

const getAllArticles = (categories, sortBy, order) => {
  return ncNewsApi
    .get("/articles", {
      params: { topic: categories, sort_by: sortBy, order: order },
    })
    .then((res) => {
      return res.data.articles;
    });
};

const getArticle = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

const getCommentsByArticleID = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

const updateArticleByArticleID = (vote, article_id) => {
  const jsonBody = {
    inc_votes: vote,
  };
  return ncNewsApi.patch(`/articles/${article_id}`, jsonBody).then((res) => {
    return res.data;
  });
};

const addCommentByArticleID = (article_id, body, username = "grumpy19") => {
  const jsonBody = {
    username,
    body,
  };
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, jsonBody)
    .then((res) => {
      return res.data.comment;
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        console.log("An error occured");
      }
    });
};

const deleteCommentByCommentID = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`).catch((err) => {
    if (err.name === "AxiosError") {
      console.log("An error occured");
    }
    console.log(err);
  });
};

const getCategories = () => {
  return ncNewsApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export default {
  getAllArticles,
  getArticle,
  getCommentsByArticleID,
  updateArticleByArticleID,
  addCommentByArticleID,
  deleteCommentByCommentID,
  getCategories,
};
