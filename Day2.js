// const calculateCircleArea = (r) =>{ return 3.14*r*r}

// const area=calculateCircl eArea(2)
// console.log(area)


// function performOperation (a,b, operation){
//     return operation(a,b)
// }

// function add(x,y)

// var fs = require('fs')



// const note = fs.readFile('notes.txt','utf-8',(err,data)=>{
//     if(err) throw err;
//     // console.log(data)
// })
// console.log(note)
const _ = require('lodash');
function sumOfEvenNumbers(numbers) {
const evenNumbers = _.filter(numbers, num => num % 2 === 0);
return _.sumBy(evenNumbers);
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(sumOfEvenNumbers(numbers)); // Output: 30 (2 + 4 + 6 + 8 + 10)
