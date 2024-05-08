import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getCategories().then((returnedCategories) => {
      setCategories(returnedCategories);
      setIsLoading(false);
    });
  }, []);
  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <div>
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
