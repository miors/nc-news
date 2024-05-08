import { useState, useEffect } from "react";
import api from "../api/api";
import Article from "./Article";
import { useSearchParams } from "react-router-dom";

export default function AllArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.get("categories");
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api.getAllArticles(categories).then((listOfArticles) => {
      setArticlesList(listOfArticles);
      setIsLoading(false);
    });
  }, [categories]);

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div>
      <h1>List of all articles</h1>
      <ul>
        {articlesList.map((article) => {
          return (
            <Article
              categories={categories}
              article={article}
              key={article.article_id}
            />
          );
        })}
      </ul>
    </div>
  );
}
