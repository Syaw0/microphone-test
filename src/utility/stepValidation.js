/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
/* eslint-disable no-use-before-define */
import mainStore from '../store/mainStore';

/* eslint-disable default-case */
const stepValidation = async (step) => {
  switch (step) {
    case 0:
      return await checkBrowserSupport();
    case 1:
      return await checkDeviceConnection();
    case 2:
      return await checkAndRequestPermission();
  }
};

const checkBrowserSupport = () => new Promise((res) => {
  if ('mediaDevices' in navigator) {
    setTimeout(() => res({ status: true }), 1000);
  } else {
    setTimeout(() => res({ status: false }), 1000);
  }
});

const checkDeviceConnection = async () => {
  const devList = await navigator.mediaDevices.enumerateDevices();
  devList.filter((dev) => dev.kind === 'audioinput');

  return new Promise((res) => {
    if (devList.length !== 0) {
      setTimeout(() => res({ status: true }), 1000);
    } else {
      setTimeout(() => res({ status: false }), 1000);
    }
  });
};

const checkAndRequestPermission = async () => new Promise((res) => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((device) => {
      mainStore.getState().createRecorder(device);
      setTimeout(() => res({ status: true }), 1000);
    })
    .catch(() => {
      setTimeout(() => res({ status: false }), 1000);
    });
});

export default stepValidation;
