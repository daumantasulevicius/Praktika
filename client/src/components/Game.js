import React from "react";
import axios from "axios";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const Game = ({ inputValues, setInputValues }) => {

  const handleInputChange = (e, field) => {
    const input = e.target.value;
    setInputValues((prev) => ({ ...prev, [field]: input }));
  };

  function tryLetterAPI(){
    axios.post('http://localhost:8081/try', {name : inputValues.name, letter : inputValues.letter})
    .then(function (response) {
      const shownWordVar = response.data.shown_word;
      const [...triedLetters] = response.data.tried_letters;
      console.log(triedLetters);
      setInputValues((prev) => ({ ...prev, "word": shownWordVar }));
      setInputValues((prev) => ({ ...prev, "triedLetters": triedLetters }));
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(`Post to api with name ${inputValues.name} and letter ${inputValues.letter}`);
  };

  return (
    <Grid>
      <Paper>

        <Paper sx={{ width: 300, ml: 5, my: 5}}>
          <Typography>
            Connected as user: {inputValues.name}
          </Typography>
        </Paper>
      
        <Grid sx={{ flexGrow: 1, py: 20, px: 50}} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">

              <Grid sx={{ px: 2 }}>
                <Paper sx={{ height: 180, width: 300 }}>
                  <Grid sx={{ px: 2 }}>
                    <Grid item sm={16}>
                      <Typography
                      variant="h6"
                      sx={{ letterSpacing: 6}}>
                      {inputValues.word}
                      </Typography>
                    </Grid>
                    <Grid item sm={16} sx={{ paddingTop: 2 }}>
                      <TextField 
                        label="Letter" 
                        variant="outlined" 
                        onChange={(e) => handleInputChange(e, "letter")}
                        helperText="Enter a letter"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={16} sx={{ paddingTop: 2 }}>
                      <Button 
                        variant = "contained"
                        onClick={() => tryLetterAPI()}
                      >
                        Try letter
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid sx={{px:2}}>
                <Paper sx={{ height: 180, width: 300 }}>
                  <Typography
                    sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Tried letters
                  </Typography>
                  <Typography>
                    {inputValues.triedLetters}
                  </Typography>
                </Paper>
              </Grid>

            </Grid>
          </Grid>
        </Grid>

      </Paper>
    </Grid>
    );
  };

export default Game;