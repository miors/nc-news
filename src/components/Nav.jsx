import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/categeories">Categories</Link> |{" "}
      <Link to="/articles">Articles</Link>
    </div>
  );
}
