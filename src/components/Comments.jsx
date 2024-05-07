import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import "./Comments.css";
import utils from "../utils";

export default function Comments({ article }) {
  const { article_id } = useParams();
  const [commentList, setCommentList] = useState([]);

  const articleID = article_id ? article_id : article.article_id;

  useEffect(() => {
    api.getCommentsByArticleID(articleID).then((listOfComments) => {
      setCommentList(listOfComments);
    });
  }, []);

  return (
    <>
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
