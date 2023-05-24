const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = 8000;
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

connectDatabase();

app.listen(PORT, () => {
  console.log(`the server started at http://localhost:${PORT}`);
});
