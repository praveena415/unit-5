const operatingSystem = require("os");

function fetchSystemDetails() {
  const cpuInfo = operatingSystem.cpus();

  console.log("=== System Details ===");
  console.log("Architecture:", operatingSystem.arch());
  console.log("Operating System:", operatingSystem.type());
  console.log("Host Name:", operatingSystem.hostname());
  console.log("CPU Core Count:", cpuInfo.length);
  console.log("CPU Model:", cpuInfo[0].model);
  console.log("CPU Speed:", cpuInfo[0].speed + " MHz");
  console.log("Total Memory:", (operatingSystem.totalmem() / (1024 ** 3)).toFixed(2), "GB");
  console.log("Available Memory:", (operatingSystem.freemem() / (1024 ** 3)).toFixed(2), "GB");
  console.log("Heap Used (MB):", (process.memoryUsage().heapUsed / (1024 ** 2)).toFixed(2));
  console.log("Heap Total (MB):", (process.memoryUsage().heapTotal / (1024 ** 2)).toFixed(2));
  console.log("=======================");
}

module.exports = fetchSystemDetails;
