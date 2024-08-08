const express = require('express');
const router = express.Router();

const {
    createTicket,
} = require('../../controllers/tickets/tickets.js');

router.post('/create-ticket', createTicket)

module.exports = router;