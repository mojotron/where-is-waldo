const formatTime = (timestemp) => {
  const options = { minute: "numeric", second: "numeric" };
  const formatter = new Intl.DateTimeFormat(navigator.language, options);
  return formatter.format(timestemp);
};

export default formatTime;
