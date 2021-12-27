import React from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Connect = ({ inputValues, setInputValues }) => {

    const navigate = useNavigate();
    const handleInputChange = (e, field) => {
      const input = e.target.value;
      setInputValues((prev) => ({ ...prev, [field]: input }));
    };

    function connectAPI(){
      axios.post('http://localhost:8081/connect', {name : inputValues.name})
      .then(function (response) {
        const shownWordVar = response.data.shown_word;
        const trueWord = response.data.word;
        const userID = response.data.id;
        setInputValues((prev) => ({ ...prev, "id":  userID}));
        navigate('/game', {state:{nameUser: inputValues.name, userID: userID, shownWord: shownWordVar, trueWord: trueWord}});
      })
      .catch(function (error) {
        console.log(error);
      });
    };

return (
    <Paper>
        <Box sx={{ padding: 2 }} >
          <Grid item sm={16}>
            <TextField 
              label="Name" 
              variant="outlined" 
              onChange={(e) => handleInputChange(e, "name")}
              helperText="Enter desired name"
              required
              fullWidth
            />
          </Grid>
          <Grid item sm={16} sx={{ paddingTop: 2 }}>
              <Button 
                variant = "contained"
                onClick={() => connectAPI()}
              >
                Connect
              </Button>
          </Grid>

        </Box> 
    </Paper>
    );
};

export default Connect;