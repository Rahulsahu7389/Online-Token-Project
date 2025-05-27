const UserModel = require('../Models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;// destructuring the data from the request body
        const user = await UserModel.findOne({email});// checking if the user already exists
        if (user) {
            return res.status(400).json({message: "User already exists",succcess:false});//success false means error
        }
        const userModel = new UserModel({name, email, password});// creating a new user
        userModel.password = await bcrypt.hash(password,10);// hashing the password and here 10 represents the number of rounds
        await userModel.save();// saving the user to the database
        return res.status(200).json({message: "User created successfully",success:true});//success true means no error
    } catch (error) {
        res.status(500).json({message: "Internal server error",success:false});//success false means error
    }
}

const login = async (req, res) => {
    try {
        const {name, email, password} = req.body;// destructuring the data from the request body
        const user = await UserModel.findOne({email});// checking if the user already exists
        if (!user) {
            return res.status(400).json({message: "either username or password is wrong",succcess:false});//success false means error
        }
        const isMatch = await bcrypt.compare(password, user.password);// comparing the password with the hashed password
        if (!isMatch) {
            return res.status(403).json({message: "either email or password is wrong",succcess:false});//success false means error
        }
        const jwtToken = jwt.sign(
            {email:user.email , _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );// creating a jwt token
        
        
        //now sending the token to the cliend so that it can be used for authentication
        return res.status(200).json({message: "logged in successfully",success:true,jwtToken,email,name:user.name});//success true means no error
    } catch (error) {
        res.status(500).json({message: "Internal server error",success:false});//success false means error
    }
}

module.exports = {
    signup,
    login
 }
