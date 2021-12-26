import React, { useState } from "react";
import { Grid, Box } from "@mui/material";

import Connect from "../components/Connect";

const ConnectPage = () => {
    const [inputValues, setInputValues] = useState({
        name: "Empty",
        id : 0,
      });

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Box py={4}>
          <Grid container spacing={2}>
            <Grid item xm={8}>
              <Connect
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

export default ConnectPage;
