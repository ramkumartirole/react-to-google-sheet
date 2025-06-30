const express = require('express');
const router = express.Router();
const UserCar = require('../model/userCar');

router.get('/', async (req, res) => {
    try {
      const cars = await UserCar.find().populate('userData');
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  module.exports = router;