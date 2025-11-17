const express = require("express");
const os = require("os");
const dns = require("dns");
const { readDataFile } = require("./read");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", async (req, res) => {
  try {
    const content = await readDataFile();
    res.send(content);
  } catch (err) {
    res.status(500).json({ error: "Could not read file", details: err.message });
  }
});

app.get("/systemdetails", (req, res) => {
  const platform = os.platform(); // e.g., 'linux', 'win32', 'darwin'
  const totalMemoryGB = (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB";
  const freeMemoryGB = (os.freemem() / (1024 ** 3)).toFixed(2) + " GB";
  const cpus = os.cpus();
  const cpuModel = cpus && cpus.length ? cpus[0].model : "Unknown";

  res.json({
    platform,
    totalMemory: totalMemoryGB,
    freeMemory: freeMemoryGB,
    cpuModel
  });
});

app.get("/getip", (req, res) => {
  const hostname = "masaischool.com";
  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      return res.status(500).json({ error: "DNS lookup failed", details: err.message });
    }
    res.json({ hostname, ipAddress: address });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
