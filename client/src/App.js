import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import GamePage from "./views/GamePage";
import ConnectPage from "./views/ConnectPage";

const App = () => {
  return (
    <BrowserRouter  basename="/">
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route path="/" element={<ConnectPage />} />
            <Route path="/game" element={<GamePage />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter >
  );
};

export default App;
