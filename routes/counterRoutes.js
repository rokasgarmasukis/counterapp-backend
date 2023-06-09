const express = require('express');
const router = express.Router();
const countersController = require('../controllers/countersController');

router.get('/users/:userId/counters', countersController.getAllCounters);
router.get('/users/:userId/counters/:counterId', countersController.getCounter);
router.post('/users/:userId/counters', countersController.createNewCounter);
router.patch(
  '/users/:userId/counters/:counterId',
  countersController.updateCounter,
);
router.delete(
  '/users/:userId/counters/:counterId',
  countersController.deleteCounter,
);

module.exports = router;
