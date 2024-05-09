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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [commentEntered, setCommentEntered] = useState(true);

  const articleID = article_id ? article_id : article.article_id;

  useEffect(() => {
    api
      .getCommentsByArticleID(articleID)
      .then((listOfComments) => {
        setCommentList(listOfComments);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          setIsLoading(false);
        }
        setIsError(true);
      });
  }, [comment, successDelete]);

  function handleAddCommentButtonClick() {
    setShowAddCommentForm(true);
  }

  function handleSubmitComment(event) {
    event.preventDefault();
    const comment = event.target[0].value;

    if (!comment) {
      setCommentEntered(false);
    } else {
      setCommentEntered(true);
      api.addCommentByArticleID(articleID, comment).then((comment) => {
        setComment(comment);
        setSuccessComment(false);
        event.target[0].value = "";
      });
    }
  }

  function handleDeleteComment(comment_id) {
    setSuccessDelete(true);
    api.deleteCommentByCommentID(comment_id).then(() => {
      setSuccessDelete(false);
    });
  }
  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div>
        <p>Unable to fetch comments. Please try again</p>
      </div>
    );
  if (commentList.length === 0)
    return (
      <div>
        <p>No comments exist</p>
      </div>
    );
  return (
    <>
      <button onClick={handleAddCommentButtonClick}>Add comment</button>
      <br />
      {!commentEntered ? <p>Please enter comment</p> : null}
      {showAddCommentForm ? (
        <form onSubmit={handleSubmitComment} className="add-article-comment">
          {successComment ? <h3>Adding comment below</h3> : null}
          <label htmlFor="body">Write yout comment:</label>
          <br />
          <textarea rows="4" cols="50" id="body" name="body" />
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
