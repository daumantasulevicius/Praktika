import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
//import Game from "./components/Game";
import ConnectPage from "./views/ConnectPage";

const App = () => {
  return (
    <HashRouter basename="/">
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route path="/" element={<ConnectPage />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
