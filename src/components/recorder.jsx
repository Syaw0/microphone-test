/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-param-reassign */
import {
  Typography, Box, Button, CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MicNoneIcon from '@mui/icons-material/MicNone';
import mainStore from '../store/mainStore';
import AudioPlayer from './audioPlayer';

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [recordTime, setRecordTime] = useState('00');

  const currentPhase = mainStore((state) => state.currentPhase);
  const setCurrentPhase = mainStore((state) => state.setCurrentPhase);

  const recorderPhase = mainStore((state) => state.recorderPhase);
  const recorder = mainStore((state) => state.recorder);
  const [timer, setTimer] = useState('');

  useEffect(() => {
    if (Number(recordTime) === 13) {
      clearInterval(timer);
      setIsFinish(true);
      setCurrentPhase('waiting');
      recorder.stop();
    }
  }, [recordTime]);

  const handleRecorder = () => {
    if (isRecording) { return; }
    recorder.start();
    setIsRecording(true);
    const interval = setInterval(() => {
      setRecordTime((state) => {
        state = Number(state);
        state += 1;
        if (state <= 9) {
          return `0${state}`;
        }
        return state;
      });
    }, 1000);
    setTimer(interval);
  };

  return (
    <Box

      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >

      <Button
        disabled={isFinish}
        onClick={handleRecorder}
        size="large"
        variant={isRecording ? 'contained' : 'outlined'}
        endIcon={<MicNoneIcon />}
      >
        {isRecording ? `00:${recordTime}` : 'Start Record'}
      </Button>

      <Typography variant="subtitle1" textAlign="center" mt={3}>
        {recorderPhase[currentPhase].icon}
        {recorderPhase[currentPhase].innerText}
      </Typography>

      {currentPhase === 'waiting' && <CircularProgress sx={{ mt: 2 }} />}
      {currentPhase === 'success' && <AudioPlayer />}

    </Box>
  );
}

export default Recorder;
