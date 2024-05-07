import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import Article from "./Article";

export default function IndArticlePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.getArticle(article_id).then((returnedArticle) => {
      setArticle(returnedArticle);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <h2>Single Article Page</h2>
      <Article article={article} key={article.article_id} />
    </>
  );
}
