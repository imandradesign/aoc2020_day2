// Pull data from the inputdata.txt local file & splits each line into a separate entry in an array
const fs = require('fs');
const data = fs.readFileSync('inputdata.txt', 'utf8').split('\n');

// Variables used to reprsent elements of the data array split into smaller parts
const passwordList = data.map(input => input.split(": ")[1]);
const requiredLetters = data.map(input => input.split(" ")[1].split(":")[0]);
const letterRange = data.map(input => input.split(" ")[0].split("-"));

// IIFE function that counts how many passwords meet the requirements
const parseData = (function(){
  let count = 0;
  // Loops through the array to check each password individually
  for (let i = 0; i < data.length; i++){
    const currentPassword = passwordList[i];
    const currentRequiredLetter = requiredLetters[i];
    const currentMin = parseInt(letterRange[i][0]);
    const currentMax = parseInt(letterRange[i][1]);
    
    // IIFE function that compares individual letters in each password to their required letters and acceptable range and adds to the count when it matches the requirements
    const checkPasswords = (function(){
      let currentLetterCount = 0;
      for (let j = 0; j < currentPassword.length; j++){
        if (currentPassword.charAt(j) == currentRequiredLetter){
          currentLetterCount+=1;
        }
      }
      if (currentLetterCount >= currentMin && currentLetterCount <= currentMax){
        count+=1;
      }
    })();
  }
  console.log(count);
  return count;
})();