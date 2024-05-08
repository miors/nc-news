import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import "./Comments.css";
import utils from "../utils";
export default function Comments({ article }) {
  const { article_id } = useParams();
  const [commentList, setCommentList] = useState([]);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const [comment, setComment] = useState({});
  const [successComment, setSuccessComment] = useState(false);

  const articleID = article_id ? article_id : article.article_id;

  useEffect(() => {
    api.getCommentsByArticleID(articleID).then((listOfComments) => {
      setCommentList(listOfComments);
    });
  }, [comment]);

  function handleAddCommentButtonClick() {
    setShowAddCommentForm(true);
  }

  function handleSubmitComment(event) {
    event.preventDefault();
    setSuccessComment(true);
    const comment = event.target[0].value;

    api.addCommentByArticleID(articleID, comment).then((comment) => {
      setComment(comment);
      setSuccessComment(false);
      event.target[0].value = "";
    });
  }

  return (
    <>
      <button onClick={handleAddCommentButtonClick}>Add comment</button>
      <br />
      {showAddCommentForm ? (
        <form onSubmit={handleSubmitComment} className="add-article-comment">
          {successComment ? <h3>Comment successfully added below</h3> : null}
          <label htmlFor="body">Write yout comment:</label>
          <br />
          <textarea rows="4" required cols="50" id="body" name="body" />
          <br />
          <button disabled={successComment}>Submit comment</button>
        </form>
      ) : null}
      {commentList.map((comment) => {
        return (
          <li className="indiv-comment" key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>Author: {comment.author}</p>
            <p>Created at: {utils.dateFormatter(comment.created_at)}</p>
            <p>Votes: {comment.votes}</p>
          </li>
        );
      })}
    </>
  );
}
