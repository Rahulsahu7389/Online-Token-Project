const router = require("express").Router();
// const otherUserValidation = require("../Middlewares/AuthValidation.js");
const { signup,login ,getAllUsers} = require("../Controller/AuthController");
const {signupValidation,loginValidation,otherUserValidation} = require("../Middlewares/AuthValidation.js");

// router.post("/login",(req,res)=>{
//     res.send("login route");
// });

router.post("/login",loginValidation,login);
router.post("/token",otherUserValidation,getAllUsers);//otherUserValidation is already a fuction first argument is validation function and second is the controller function
router.post("/signup",signupValidation,signup);//signupvalidation is already a fuction first argument is validation function and second is the controller function
//signup function tbhi chlega jab validate ho jaega
module.exports = router;