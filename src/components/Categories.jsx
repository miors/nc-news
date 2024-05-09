import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .getCategories()
      .then((returnedCategories) => {
        setCategories(returnedCategories);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          setIsLoading(false);
        }
        setIsError(true);
      });
  }, []);
  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div>
        <p>Unable to fetch categories. Please try again</p>
      </div>
    );
  if (categories.length === 0)
    return (
      <div>
        <p>No categories exist</p>
      </div>
    );
  return (
    <div className="categories-section">
      <h2>Categories Page</h2>
      {categories.map((category) => {
        return (
          <p key={category.slug}>
            <Link to={`/articles?categories=${category.slug}`}>
              {category.slug}
            </Link>
          </p>
        );
      })}
    </div>
  );
}
