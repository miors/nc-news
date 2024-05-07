import "./Article.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Article({ article }) {
  const navigate = useNavigate();
  const dateFormatter = (created_at) => {
    return new Date(created_at).toLocaleDateString();
  };

  function handleButtonClick() {
    navigate(`/article/${article.article_id}`);
  }
  return (
    <li key={article.article_id} className="articleBox">
      <h2>{article.title}</h2>
      <h3>Topic: {article.topic}</h3>
      <h4>Created at: {dateFormatter(article.created_at)}</h4>
      <p>Author: {article.author}</p>
      <img src={article.article_img_url} />
      <p>Comment counts: {article.comment_count}</p>
      <p>Votes: {article.votes}</p>
      {Object.keys(useParams()).length === 0 ? (
        <button className="readMoreButton" onClick={handleButtonClick}>
          Read more..
        </button>
      ) : null}
    </li>
  );
}
