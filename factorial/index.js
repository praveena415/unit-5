const findFactorial = require("./factorial");

let numbers = [5, 7, 10];
for (let index = 0; index < numbers.length; index++) {
	let result = findFactorial(numbers[index]);
	console.log(`Factorial of ${numbers[index]} is: `, result);
}
