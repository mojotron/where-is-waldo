const formatTime = (timestamp) => {
  const options = { minute: "numeric", second: "numeric" };
  const formatter = new Intl.DateTimeFormat(navigator.language, options);
  return formatter.format(timestamp);
};

export default formatTime;
