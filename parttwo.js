// Pull data from the inputdata.txt local file & splits each line into a separate entry in an array
const fs = require('fs');
const data = fs.readFileSync('inputdata.txt', 'utf8').split('\n');

// Variables used to reprsent elements of the data array split into smaller parts
const passwordList = data.map(input => input.split(": ")[1]);
const requiredLetters = data.map(input => input.split(" ")[1].split(":")[0]);
const letterIndices = data.map(input => input.split(" ")[0].split("-"));

// IIFE that counts how many passwords meet the requirements
const parseData = (function(){
  let count = 0;
  // Loops through the array to check each password individually
  for (let i = 0; i < passwordList.length; i++){
    const currentPassword = passwordList[i];
    const currentRequiredLetter = requiredLetters[i];
    // The index values are all subtracted by 1 because the indexes provided don't account for index zero
    const indexOne = parseInt(letterIndices[i][0]) - 1;
    const indexTwo = parseInt(letterIndices[i][1]) - 1;
    
    // Checks to make sure that only one of the indexes provided has the required letter for each password and adds to the count if it does meet that requirement
    if ((currentPassword[indexOne] == currentRequiredLetter && currentPassword[indexTwo] !== currentRequiredLetter) || (currentPassword[indexOne] !== currentRequiredLetter && currentPassword[indexTwo] == currentRequiredLetter)){
      count+=1;
    }
  }
  console.log(count);
  return count;
})();