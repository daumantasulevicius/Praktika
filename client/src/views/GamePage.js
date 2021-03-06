import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import Game from "../components/Game";

const GamePage = () => {
    const location = useLocation();
    const { userID } = location.state;
    const { nameUser } = location.state;
    const { shownWord } = location.state;
    const { trueWord } = location.state;
    console.log(trueWord);
    const [inputValues, setInputValues] = useState({
        userID : userID,
        name: nameUser,
        triesLeft: 10,
        word: shownWord,
        trueWord: trueWord,
        triedLetters: [],
      });

  return (
    <div>
      <Grid>
        <Box px={2} py={2}>
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
