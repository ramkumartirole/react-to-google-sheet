const express = require('express');
const router = express.Router();
const UserCar = require('../model/userCar');
const User = require('../model/user');
const exportToGoogleSheet = require('../services/saveExceFIle');


router.post('/', async (req, res) => {
  try {
    const { userData, carData } = req.body;
    const { email } = userData;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }


    const newUserCar = new UserCar({
      userData: user._id,
      carData
    });

    await newUserCar.save();

   await exportToGoogleSheet(user, carData);

    res.status(201).json({ message: 'UserCar data saved successfully', data: newUserCar });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
