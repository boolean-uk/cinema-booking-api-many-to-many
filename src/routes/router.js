const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/:id', async (req, res) => {
    const screenId = parseInt(req.params.id)

    try {
        const result = await prisma.screening.findUnique({
            where: {
                id: screenId,
            },
            include: {
                movie: true,
                screen: true,
                tickets: {
                    include: {
                        customer: true,
                        seats: true,
                    },
                },
            },
        })

        res.json(result)
    } catch (err) {
        console.log('Woopsies: ', err)
    }
})

router.post('/', async (req, res) => {
    const { customerId, screeningId, seats } = req.body

    /* Expected req.body format
    {
      "customerId": int,
      "screeningId": int,
      "seats": [
        {
          "row": int,
          "number": int,
        },
        {
          "row": int,
          "number": int,
        }
      ]
    }
    */

    try {
        const result = await prisma.ticket.create({
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
                seats: {
                    create: seats.map((seat) => ({
                        ...seat,
                        screening: {
                            connect: {
                                id: screeningId,
                            },
                        },
                    })),
                },
            },
            include: {
                customer: true,
                screening: true,
                seats: true,
            },
        })

        res.json(result)
    } catch (err) {
        console.log('Woopsies: ', err)
    }
})

module.exports = router
