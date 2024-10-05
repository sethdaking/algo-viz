// utils/generateArray.js
const generateArray = (length: number, maxValue: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * maxValue));
};

export default generateArray;
