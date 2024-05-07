import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AllArticlesPage from "./components/AllArticlesPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App"></div>
      Inside App
      <div className="header">In Header</div>
      <div className="nav">In Nav</div>
      <div className="content">
        <AllArticlesPage />
      </div>
    </>
  );
}

export default App;
