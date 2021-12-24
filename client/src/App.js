import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import Game from "./components/Game";

const App = () => {
  const [inputValues, setInputValues] = useState({
    test: 0,
  });

  return (
    <div>
      <Game 
        inputValues={inputValues}
        setInputValues={setInputValues}
        />
    </div>
  );
};

export default App;
