import { useState, useEffect } from "react";
import api from "../api/api";
import Article from "./Article";

export default function AllArticlesPage({ articlesList }) {
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
