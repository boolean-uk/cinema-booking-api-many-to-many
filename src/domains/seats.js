const prisma = require('../utils/prisma');

const getSeatsDb = async (screenId) => await prisma.seat.findMany({
    where: { screenId },
});

const createTicketDb = async (screeningId, customerId) => {
    try {

        return await prisma.ticket.create({
            data: {
              screening: {
                connect: {
                  id: 1,
                }
              },
              customer: {
                connect: {
                  id: 1,
                }
              },

            },
            include: {
              seats: true,
            }
            
          });
          
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};

module.exports = { getSeatsDb, createTicketDb };
