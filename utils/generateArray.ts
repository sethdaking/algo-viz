// utils/generateArray.js
const generateArray = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
  };
  
  export default generateArray;
  