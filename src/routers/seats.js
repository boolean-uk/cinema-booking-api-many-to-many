const router = require("express").Router();

const {
  getAllSeats,
  getSeatById,
  createTicket,
} = require("../controllers/seats-controller");

// Get all seats
router.get("/", getAllSeats);

// Get seats by screenId
router.get("/:id", getSeatById);

//Create ticket with relation to sears
router.post("/", createTicket);

module.exports = router;
