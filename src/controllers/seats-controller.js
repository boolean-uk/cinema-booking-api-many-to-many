const prisma = require("../utils/prisma");

const getAllSeats = async (req, res) => {
  try {
    const seats = await prisma.seat.findMany();
    res.json({ seats: seats });
  } catch (err) {
    console.log("Error:", err);
  }
};

const getSeatById = async (req, res) => {
  try {
    const screenId = Number(req.params.id);
    const seats = await prisma.seat.findMany({
      where: {
        screenId,
      },
    });
    res.json({
      seats: seats,
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

const createTicket = async (req, res) => {
  const { screeningId, customerId, seatId } = req.body;
  try {
    const ticket = await prisma.ticket.create({
      data: {
        screening: {
          connect: {
            id: screeningId,
          },
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
        seats: {
          connect: [
            {
              id: seatId,
            },
          ],
        },
      },
      include: {
        seats: {
          select: {
            seatNumber: true,
          },
        },
      },
    });
    res.json({
      tickets: ticket,
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = {
  getAllSeats,
  getSeatById,
  createTicket,
};
