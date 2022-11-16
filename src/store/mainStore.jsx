/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import create from 'zustand';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import checkVoice from '../utility/checkVoice';

export default create((set, get) => ({
  voiceSrc: '',
  setVoiceSrc: (src) => {
    set({ voiceSrc: src });
  },
  steps: [
    {
      step: 0,
      label: 'Check For Browser Support',
      description: 'I will check your browser for microphone support',
      isError: false,
    },
    {
      step: 1,
      label: 'Check Device Connection',
      description:
      'Im checking if the microphone is plugged to system',
      isError: false,
    },
    {
      step: 2,
      label: 'Check Microphone Permission',
      description: 'You will need to give microphone permission to user agent to be able use microphone',
      isError: false,
    },
  ],

  recorderPhase: {
    firstInfo: { innerText: 'When you ready start recording and try make noise in your microphone and do it for 20s!' },
    waiting: { innerText: 'Wait until process completed' },
    success: { innerText: 'Your microphone is fine and test is completed you can hear your voice', icon: <CheckCircleIcon color="success" /> },
    error: { innerText: 'your microphone has issue and test is failed' },

  },

  currentPhase: 'firstInfo',
  setCurrentPhase: (phase) => {
    set({ currentPhase: phase });
  },

  currentComponent: 'stepper',
  setCurrentComponent: (com) => {
    set({ currentComponent: com });
  },

  recorder: null,
  voiceData: null,

  createRecorder: (dev) => {
    const recorder = new MediaRecorder(dev);
    recorder.ondataavailable = async (d) => {
      set({ voiceData: d.data });

      const { status } = await checkVoice();
      if (status) {
        set({ currentPhase: 'success' });
      } else {
        set({ currentPhase: 'error' });
      }
    };
    set({ recorder });
  },

  setStepError: (step) => {
    const newSteps = get().steps.map((s) => {
      console.log(step, s.step);
      if (s.step === step) {
        s.isError = true;
        return s;
      }
      return s;
    });
    console.log(newSteps);
    set({ steps: newSteps });
  },
}));
