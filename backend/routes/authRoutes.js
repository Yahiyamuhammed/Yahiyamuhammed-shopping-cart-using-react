const express = require('express');
const router=express.Router()
const {signup,verifyOtp,login,resendOtp} =require('../controllers/authController')

router.post('/signup',signup, (req, res) => {
    console.log('enterd auth foloder');
    
  res.send('API is working 🚀');
});
router.post('/verify-otp', verifyOtp); 
router.post('/resend-otp', resendOtp); 
router.post('/login', login);


module.exports=router