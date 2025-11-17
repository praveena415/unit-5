const fileSystem = require("fs");

function readDataFromFile() {
	fileSystem.readFile("./data.txt", "utf-8", (error, content) => {
		if (error) console.log(error);
		console.log(content);
	});
}
function addDataToFile() {
	fileSystem.appendFile("./data.txt", "This is appended content", (error) => {
		if (error) console.log(error);
	});
}

module.exports = { readDataFromFile, addDataToFile };
