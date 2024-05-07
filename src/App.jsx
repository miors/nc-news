import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AllArticlesPage from "./components/AllArticlesPage";
import IndArticlePage from "./components/IndArticlePage";
import Article from "./components/Article";
import { Routes, Route } from "react-router-dom";
import api from "./api/api";

function App() {
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    api
      .getAllArticles()
      .then((listOfArticles) => setArticlesList(listOfArticles));
  }, []);

  return (
    <>
      <div className="App"></div>
      Inside App
      <div className="header">In Header</div>
      <div className="nav">In Nav</div>
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
