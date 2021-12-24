import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const Game = ({ inputValues, setInputValues }) => {

return (
    <Paper>
      <Box sx={{ padding: 2 }} >
        <Grid item sm={16}>
          <TextField id="outlined-basic" label="Placeholder for word" variant="outlined" />
        </Grid>
        <Grid item sm={16} sx={{ paddingTop: 2 }}>
          <TextField id="outlined-basic" label="Type a letter" variant="outlined" />
        </Grid>

      </Box>
    </Paper>
  );
};
  export default Game;