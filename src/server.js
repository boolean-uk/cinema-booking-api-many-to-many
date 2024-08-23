const express = require("express");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
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

// GET REQUESTS

app.get(["/", "/movies"], async (req, res) => {
  const response = await prisma.movie.findMany();
  res.json(response);
});

app.get("/screenings", async (req, res) => {
  const response = await prisma.screening.findMany();
  res.json(response);
});

app.get(["/screens", "/screen"], async (req, res) => {
  const response = await prisma.screen.findMany();
  res.json(response);
});

app.get("/screen/:id", async (req, res) => {
  const response = await prisma.screen.findMany({
    where: { id: Number(req.params.id) },
  });
  res.json(response);
});

app.get("/screen/:id", async (req, res) => {
  const response = await prisma.screen.findMany({
    where: { id: Number(req.params.id) },
  });
  res.json(response);
});

app.get("/ticket", (req, res) => {
  res.status(400).json({ Error: "Missing Ticket ID" });
});

app.get("/ticket/:id", async (req, res) => {
  const response = await prisma.ticket.findMany({
    where: { id: Number(req.params.id) },
  });
  res.json(response);
});

// POST REQUESTS

app.post("/ticket", async (req, res) => {
  const response = await prisma.ticket.create({
    data: {
      screeningId: 2,
      customerId: 1,
      seats: { connect: [{ id: 3 }, { id: 4 }] },
    },
  });
  res.status(201).json(response);
});

module.exports = app;
