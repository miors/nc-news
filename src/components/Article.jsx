import "./Article.css";
import { useParams } from "react-router-dom";

import ArticleBody from "./ArticleBody";
import Comments from "./Comments";
import Expandable from "./Expandable";

export default function Article({ article }) {
  return (
    <>
      <ul>
        <ArticleBody article={article} />
      </ul>

      {Object.keys(useParams()).length === 0 ? null : (
        <>
          <Expandable>
            <ul className="comments-container">
              <Comments article={article} />
            </ul>
          </Expandable>
        </>
      )}
    </>
  );
}
