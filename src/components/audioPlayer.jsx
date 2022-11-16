/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import mainStore from '../store/mainStore';

function AudioPlayer() {
  const voiceData = mainStore((state) => state.voiceData);
  const uri = URL.createObjectURL(voiceData);
  return (
    <audio style={{ marginTop: '1rem' }} controls>
      <source src={uri} />
    </audio>
  );
}

export default AudioPlayer;
