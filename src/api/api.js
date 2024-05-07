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

export default { getAllArticles };
