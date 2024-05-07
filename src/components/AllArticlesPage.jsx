import { useState, useEffect } from "react";
import api from "../api/api";
import Article from "./Article";

export default function AllArticlesPage() {
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    api
      .getAllArticles()
      .then((listOfArticles) => setArticlesList(listOfArticles));
  }, []);

  return (
    <div>
      <h1>List of all articles</h1>
      <ul>
        {articlesList.map((article) => {
          return <Article article={article} key={article.article_id} />;
        })}
      </ul>
    </div>
  );
}
