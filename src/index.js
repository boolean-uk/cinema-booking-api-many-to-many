// Load our .env file
require("dotenv").config();
const port = process.env.PORT || 4000;
const app = require("./server.js");

// Start our API server
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
