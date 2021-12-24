import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const Connect = ({ inputValues, setInputValues }) => {

    const handleInputChange = (e, field) => {
      const input = e.target.value;
      setInputValues((prev) => ({ ...prev, [field]: input }));
    };

    function connectAPI(){
      axios.post('http://localhost:8081/connect', {name : inputValues.name})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(`Post to api with name ${inputValues.name}`);
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