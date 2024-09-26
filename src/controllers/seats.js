const { getSeatsDb, createTicketDb } = require('../domains/seats.js')

const getSeats = async (req, res) => {
    const screenId = Number(req.params.screenId)
    const seats = await getSeatsDb(screenId)
    res.status(201).json({ seats })
}

const createTicket = async (req, res) => {
    const { screeningId, customerId, seatId } = req.body
    const ticket = await createTicketDb(screeningId, customerId, seatId)
    res.status(200).json({ ticket })
}

module.exports = { getSeats, createTicket }