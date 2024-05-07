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

export default { getAllArticles, getArticle, getCommentsByArticleID };
