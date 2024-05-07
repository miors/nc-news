import "./Article.css";

export default function Article({ article }) {
  return (
    <li key={article.article_id} className="articleBox">
      <h2>{article.title}</h2>
      <h3>Topic: {article.topic}</h3>
      <h4>Created at: {article.created_at}</h4>
      <p>Author: {article.author}</p>
      <img src={article.article_img_url} />
      <p>Comment counts: {article.comment_count}</p>
      <p>Votes: {article.votes}</p>
    </li>
  );
}
