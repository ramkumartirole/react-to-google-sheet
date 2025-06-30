const User = require("../model/user")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const app = express();

const CLIENT_ID = process.env.clientID;
const client = new OAuth2Client(CLIENT_ID);

const generateToken= (user)=>{
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
router.post('/', async (req, res) => {
  try {
    const jwttoken = req.body.token;
    const ticket = await client.verifyIdToken({
      idToken: jwttoken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let isNewUser = false;
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      isNewUser = true;
      user = new User({
        googleId: payload.sub,
        firstName: payload.given_name || payload.name.split(' ')[0],
        lastName: payload.family_name || payload.name.split(' ')[1] || '',
        email: payload.email,
        profileImage: payload.picture,
        city: payload.city?.name || null,
        state: payload.state?.name || null,
        gender: payload.gender || null,
        country: payload.country || null,
        activity: payload.activity || [],
        signupMethod: 'google',
        signupDate: new Date()
      });
      await user.save();


    } else {

      user.lastLogin = new Date();
      user.profileImage = payload.picture;
      await user.save();
    }
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000
    });

    res.json({
      success: true,
      action: isNewUser ? 'signup' : 'login',
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        email: user.email,
        city: user.city?.name || null,
        state: user.state?.name || null,
        gender: user.gender,
        country: user.country,
        activity: user.activity,
        profileImage: user.profileImage,
        isNewUser
      }
    });

  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
});


module.exports = router;