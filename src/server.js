const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");

// Add middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add your router below

const ticketsRouter = require("./routers/tickets");
const seatsRouter = require("./routers/seats");

app.use("/tickets", ticketsRouter);
app.use("/seats", seatsRouter);

module.exports = app;
