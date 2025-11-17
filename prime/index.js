const checkPrime = require("./nodePrime.js");
let numbers = [2, 10, 17, 21, 29];
for (let index = 0; index < numbers.length; index++) {
	if (checkPrime(numbers[index])) {
		console.log(`${numbers[index]} is a prime number`);
	} else {
		console.log(`${numbers[index]} is not a prime number`);
	}
}
