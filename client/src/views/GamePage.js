import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import Game from "../components/Game";

const GamePage = () => {
    const location = useLocation();
    const { nameUser } = location.state;
    const { shownWord } = location.state;
    console.log(location);
    const [inputValues, setInputValues] = useState({
        name: nameUser,
        triesLeft: 0,
        word: shownWord,
        triedLetters: [],
      });

  return (
    <div>
      <Grid>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Game
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default GamePage;
