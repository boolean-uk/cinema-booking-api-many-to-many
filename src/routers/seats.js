const express = require('express')
const { getSeats, createTicket } = require('../controllers/seats.js')
const router = express.Router()

router.get('/screen/:screenId', getSeats)

router.post('/ticket', createTicket)

module.exports = router