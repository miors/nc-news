import { useState, useEffect } from "react";
import api from "../api/api";
import Article from "./Article";
import { useSearchParams } from "react-router-dom";
import "./AllArticlePage.css";

export default function AllArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.get("categories");
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .getAllArticles(categories, sortBy, order)
      .then((listOfArticles) => {
        setArticlesList(listOfArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          setIsLoading(false);
        }
        setIsError(true);
      });
  }, [categories, sortBy, order]);

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div>
        <p>Unable to fetch article. Please try again</p>
      </div>
    );
  if (articlesList.length === 0)
    return (
      <div>
        <p>No articles exist</p>
      </div>
    );

  const setSortOrder = (direction, sortBy) => {
    // copy existing queries to avoid mutation
    const newParams = new URLSearchParams(searchParams);
    // set the order query
    newParams.set("order", direction);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };

  return (
    <div>
      <h1>List of {categories ? ` ${categories}` : ` all`} articles</h1>
      <div className="sort-buttons">
        Sort by: <br />
        <button
          onClick={() => {
            setSortOrder("asc", "created_at");
          }}
        >
          Date asc
        </button>
        <button onClick={() => setSortOrder("desc", "created_at")}>
          Date desc
        </button>
        <button
          onClick={() => {
            setSortOrder("asc", "comment_count");
          }}
        >
          Comment count asc
        </button>
        <button onClick={() => setSortOrder("desc", "comment_count")}>
          Comment count desc
        </button>
        <button
          onClick={() => {
            setSortOrder("asc", "votes");
          }}
        >
          Votes asc
        </button>
        <button onClick={() => setSortOrder("desc", "votes")}>
          Votes desc
        </button>
      </div>
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
