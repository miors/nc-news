import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AllArticlesPage from "./components/AllArticlesPage";
import IndArticlePage from "./components/IndArticlePage";
import Article from "./components/Article";
import { Routes, Route } from "react-router-dom";
import api from "./api/api";
import Nav from "./components/Nav";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api.getAllArticles().then((listOfArticles) => {
      setArticlesList(listOfArticles);
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
    <>
      <div className="App"></div>
      Inside App
      <div className="header">
        <h1>NC & Mior's News</h1>
      </div>
      <div className="nav">
        <Nav />
      </div>
      <div className="content">
        <Routes>
          <Route
            path="/articles"
            element={<AllArticlesPage articlesList={articlesList} />}
          />
          <Route path="/article/:article_id" element={<IndArticlePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
