import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-mior.onrender.com/api",
});

const getAllArticles = () => {
  return ncNewsApi
    .get("/articles")
    .then((res) => {
      return res.data.articles;
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        console.log("An error occured");
      }
    });
};

const getArticle = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((res) => {
      return res.data.article;
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        console.log("An error occured");
      }
    });
};

const getCommentsByArticleID = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then((res) => {
      return res.data.comments;
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        console.log("An error occured");
      }
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

export default {
  getAllArticles,
  getArticle,
  getCommentsByArticleID,
  updateArticleByArticleID,
  addCommentByArticleID,
  deleteCommentByCommentID,
};
