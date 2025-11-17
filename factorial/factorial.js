function calculateFactorial(num) {
	if (num === 0 || num === 1) return 1;
	return num * calculateFactorial(num - 1);
}
module.exports = calculateFactorial;
