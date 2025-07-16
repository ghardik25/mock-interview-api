const express = require('express');
const router = express.Router();
const { startInterview } = require('../controllers/interview');

router.post('/start', startInterview);

module.exports = router;
