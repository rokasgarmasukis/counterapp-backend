const express = require('express');
const router = express.Router();
const countersController = require('../controllers/countersController');

router.get('/', countersController.getAllCounters);
router.get('/:id', countersController.getCounter);
router.post('/', countersController.createNewCounter);
router.patch('/:id', countersController.updateCounter);
router.delete('/:id', countersController.deleteCounter);

module.exports = router;