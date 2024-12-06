const express = require("express");
const dotenv = require("dotenv");
const userRauter = require("./routes/authRoutes");
const expenseRauter = require("./routes/expenseRoutes");
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("expense api app runing...");
});

app.use("/users", userRauter);

app.use("/Expense", expenseRauter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
