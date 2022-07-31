const matchRegex = (str: string, regex: RegExp) => {
  const isMatch = regex.test(str);
  return isMatch;
};

export default matchRegex;
