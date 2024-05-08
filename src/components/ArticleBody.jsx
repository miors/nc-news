import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import utils from "../utils";
import "./ArticleBody.css";
import { useState } from "react";
import api from "../api/api";

export default function ArticleBody({ article }) {
  const navigate = useNavigate();
  const [newVoteUpdate, setNewVoteUpdate] = useState(0);
  const [error, setError] = useState(false);

  function handleButtonClick() {
    navigate(`/article/${article.article_id}`);
  }

  function handleVote(vote) {
    api
      .updateArticleByArticleID(vote, article.article_id)
      .then(() => {
        setError(false);
        setNewVoteUpdate((currentVote) => {
          return vote + currentVote;
        });
      })
      .catch(() => {
        setError(true);
      });
  }

  return (
    <li key={article.article_id} className="articleBox">
      <h2>{article.title}</h2>
      <h3>Topic: {article.topic}</h3>
      <h4>Created at: {utils.dateFormatter(article.created_at)}</h4>
      <p>Author: {article.author}</p>
      <img src={article.article_img_url} />
      <p>Comment counts: {article.comment_count}</p>
      <p>
        <button
          disabled={newVoteUpdate === -1}
          onClick={() => {
            handleVote(-1);
          }}
        >
          -
        </button>
        Votes: {String(article.votes + newVoteUpdate)}
        <button
          disabled={newVoteUpdate === 1}
          onClick={() => {
            handleVote(1);
          }}
        >
          +
        </button>
        {error && <p>Error detected. Please try again</p>}
      </p>
      {Object.keys(useParams()).length === 0 ? (
        <button className="readMoreButton" onClick={handleButtonClick}>
          Read more..
        </button>
      ) : null}
    </li>
  );
}
