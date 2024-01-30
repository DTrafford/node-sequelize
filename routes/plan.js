const express = require('express');
const router = express.Router();
const Plans = require('../controllers/plan');

router.route('/plans').get(Plans.get);

module.exports = router;