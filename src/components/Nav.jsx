import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/categories">Categories</Link> |{" "}
      <Link to="/articles">Articles</Link>
    </div>
  );
}
