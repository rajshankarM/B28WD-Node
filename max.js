console.log("max !!!");


const [, , nums] = process.argv;
console.log("Input string:" , nums)
const arr = JSON.parse(nums)
console.log("Converted to array:",arr);
console.log("Max Number is:",Math.max(...arr))