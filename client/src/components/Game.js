import React, { useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Modal,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageImage from "../images/rawpixel.jpg"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const typograph = {
  flexGrow: 1,
  textAlign: "center",
};

const paperBlock ={
  backgroundImage: `url(${PageImage})`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
};

const Game = ({ inputValues, setInputValues }) => {
  const navigate = useNavigate();
  const [showWinModal, setWinModal] = React.useState(false);
  const [showFailModal, setFailModal] = React.useState(false);
  const [letter, setLetter] = React.useState("");

  const[letterError, setLetterError] = React.useState(false);
  const[letterHelper, setLetterHelper] = React.useState("Enter a single letter");

  const isValidLetter = (str) => {
    return /^[A-Za-z]{0,1}$/.test(str);
  };

  const handleInputChange = (e, field) => {
    const input = e.target.value;

    if(!isValidLetter(input)){
      setLetterError(true);
      setLetterHelper("Please enter only a single letter");
    }
    else{
      setLetterError(false);
      setLetterHelper("Enter a single letter");
      setLetter(input);
      setInputValues((prev) => ({ ...prev, [field]: input }));
    }
    
  };

  const onUnload = () => {
    disconnectAPI();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload)
    }
  });

  function tryLetterAPI(){
    axios.post('http://localhost:8081/try', {id : inputValues.userID, letter : inputValues.letter})
    .then(function (response) {
      const shownWordVar = response.data.shown_word;
      const [...triedLetters] = response.data.tried_letters;
      const triesLeft = response.data.tries_left;
      const lettersLeft = response.data.letters_left;
      //console.log(triedLetters);
      setInputValues((prev) => ({ ...prev, "word": shownWordVar }));
      setInputValues((prev) => ({ ...prev, "triedLetters": triedLetters }));
      setInputValues((prev) => ({ ...prev, "triesLeft": triesLeft }));
      if (lettersLeft === 0)
        setWinModal(true);
      if (triesLeft === 0)
        setFailModal(true);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(`Post to api with name ${inputValues.name} and letter ${inputValues.letter}`);
    setLetter("");
  };

  function restartAPI(){
    axios.post('http://localhost:8081/restart', {id : inputValues.userID})
      .then(function (response) {
        const shownWordVar = response.data.shown_word;
        const [...triedLetters] = response.data.tried_letters;
        const triesLeft = response.data.tries_left;
        setInputValues((prev) => ({ ...prev, "word": shownWordVar }));
        setInputValues((prev) => ({ ...prev, "triedLetters": triedLetters }));
        setInputValues((prev) => ({ ...prev, "triesLeft": triesLeft }));
        setWinModal(false);
        setFailModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(`Post to api with name ${inputValues.name}`);
  };

  function disconnectAPI(){
    axios.post('http://localhost:8081/disconnect', {id : inputValues.userID})
    .then(function (response) {
      navigate('/');
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(`Post to api with name ${inputValues.name}`);
  };

  return (
    <Grid>

    <div>
      <Modal
        open={showWinModal}
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You WON !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The word was {inputValues.word}
          </Typography>
          <Button 
            sx={{mt: 2}}
            variant = "contained"
            onClick={() => restartAPI()}
            >
            Restart
          </Button>
        </Box>
      </Modal>

      <Modal
        open={showFailModal}
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You FAILED !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The word was {inputValues.trueWord}
          </Typography>
          <Button 
            variant = "contained"
            onClick={() => restartAPI()}
            >
            Restart
          </Button>
        </Box>
      </Modal>
    </div>

      <Paper sx={{py: 2}} style={paperBlock}>

        <Paper sx={{ width: 300, ml: 5, px: 2}}>
          <Typography sx={{py: 1}}>
            Connected as user: {inputValues.name}
          </Typography>
          <Button 
            sx={{my: 1}}
            variant = "contained"
            color="warning"
            onClick={() => disconnectAPI()}
            >
            Disconnect
          </Button>
        </Paper>

        <Paper variant="outlined" sx={{ width: 300, ml: 75}}>
          <img src={require(`../images/${inputValues.triesLeft}.png`)} alt="imageOfHangman" width={300} height={300}/>
          <Typography
            variant="h6"
            style={typograph}
            sx={{ letterSpacing: 6}}>
            {inputValues.word}
          </Typography>
        </Paper>

        

        <Grid sx={{ flexGrow: 1, py: 5, px: 50}} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">

              <Grid sx={{ px: 2 }}>
                <Paper sx={{ height: 180, width: 300 }}>
                  <Grid sx={{ px: 2 }}>
                    
                    <Grid item sm={16} sx={{ paddingTop: 2 }}>
                      <TextField 
                        label="Letter"
                        value={letter}
                        error={letterError}
                        variant="outlined" 
                        onChange={(e) => handleInputChange(e, "letter")}
                        helperText={letterHelper}
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
                    sx={{ fontSize: 14, px: 2, py: 1}} color="text.secondary" gutterBottom>
                    Tried letters
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, px: 2}}>
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