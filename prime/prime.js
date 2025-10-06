function checkPrime(num) {
	if (num < 2) return false;
	for (let factor = 2; factor <= Math.sqrt(num); factor++) {
		if (num % factor === 0) return false;
	}
	return true;
}

module.exports = checkPrime;
