const express = require('express');
const router = express.Router();

const {
    getSeatsByScreenId
} = require('../../controllers/seats/seats.js');

router.get('/screen-seats/:id', getSeatsByScreenId)

module.exports = router;