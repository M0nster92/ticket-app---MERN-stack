const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Ticket Api" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
