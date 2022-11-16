const checkVoice = () => new Promise((res) => {
  setTimeout(() => { res({ status: true }); }, 2000);
});

export default checkVoice;
