/* eslint-disable import/extensions */
import { Box } from '@mui/material';
import React from 'react';
import MyStepper from './components/stepper';
import Recorder from './components/recorder';
import mainStore from './store/mainStore';

function App() {
  const currentComponent = mainStore((state) => state.currentComponent);

  return (

    <Box
      data-testid="wrapper"
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 1,
      }}
    >
      {currentComponent === 'stepper' && <MyStepper />}
      {currentComponent === 'recorder' && <Recorder />}
    </Box>

  );
}

export default App;
