import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import 'react-tree-graph/dist/style.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Content />
      </div>
    </>
  );
}

export default App;
