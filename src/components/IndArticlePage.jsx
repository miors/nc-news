import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";
import Article from "./Article";

export default function IndArticlePage() {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    api.getArticle(article_id).then((article) => setArticle(article));
  }, []);

  return <Article article={article} key={article.article_id} />;
}
