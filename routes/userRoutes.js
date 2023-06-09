const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.getAllUsers);
router.get('/users/:userId', usersController.getUser);
router.post('/users', usersController.createNewUser);
router.patch('/users/:userId', usersController.updateUser);
router.delete('/users/:userId', usersController.deleteUser);

module.exports = router;
