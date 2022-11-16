/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  Button, Grid, Typography,
} from '@mui/material';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

function App() {
  const [isShow, setIsShow] = useState(false);
  return (
    <Grid
      data-testid="wrapper"
      sx={{
        height: '100vh',

      }}
    >

      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        spacing={0}
        sx={{
          width: '100%',
          border: '1px solid black',
          height: '100%',
        }}
      >
        <Button sx={{ m: 2 }} variant="contained" onClick={() => setIsShow(true)}>Hello Lets do this!</Button>
        {isShow && (
        <Typography variant="h5">
          Hello there ! we are gonna create a amazing app
          {' '}
          <EmojiEmotionsIcon fontSize="medium" color="primary" />
        </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
