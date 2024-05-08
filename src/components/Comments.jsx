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
  const [successDelete, setSuccessDelete] = useState(false);

  const articleID = article_id ? article_id : article.article_id;

  useEffect(() => {
    api.getCommentsByArticleID(articleID).then((listOfComments) => {
      setCommentList(listOfComments);
    });
  }, [comment, successDelete]);

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

  function handleDeleteComment(comment_id) {
    setSuccessDelete(true);
    api.deleteCommentByCommentID(comment_id).then(() => {
      setSuccessDelete(false);
    });
  }

  return (
    <>
      <button onClick={handleAddCommentButtonClick}>Add comment</button>
      <br />
      {showAddCommentForm ? (
        <form onSubmit={handleSubmitComment} className="add-article-comment">
          {successComment ? <h3>Adding comment below</h3> : null}
          <label htmlFor="body">Write yout comment:</label>
          <br />
          <textarea rows="4" required cols="50" id="body" name="body" />
          <br />
          <button disabled={successComment}>Submit comment</button>
        </form>
      ) : null}

      {successDelete ? (
        <h3 key={comment.comment_id}> Deleting comment</h3>
      ) : null}
      {commentList.map((comment) => {
        return (
          <li className="indiv-comment" key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>Author: {comment.author}</p>
            <p>Created at: {utils.dateFormatter(comment.created_at)}</p>
            <p>Votes: {comment.votes}</p>
            <button
              disabled={successDelete}
              onClick={() => {
                handleDeleteComment(comment.comment_id);
              }}
            >
              Delete comment
            </button>
          </li>
        );
      })}
    </>
  );
}
