const prisma = require("../../utils/prisma.js");

const createTicket = async (req, res) => {
  const { screeningId, seatIds, customerId } = req.body;

  const ticket = await prisma.ticket.create({
    data: {
      customer: {
        connect: {
          id: customerId,
        },
      },
      screening: {
        connect: {
          id: screeningId,
        },
      },
      seats: { connect: seatIds.map((seatId) => ({ id: seatId })) },
    },
    include: {
        customer: true,
        screening: true,
        seats: true,
    }
  });

  res.json(ticket)
};

module.exports = {
  createTicket,
};
