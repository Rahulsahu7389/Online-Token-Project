const UserModel = require('../Models/users');
const dotenv = require('dotenv');
dotenv.config();
const otherUserModel = require('../Models/otherUsers');
// const twilio = require('twilio');

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (p) => {
    let msgOptions = {
        from : process.env.TWILIO_PHONE_NUMBER,
        to : `+91${p}`,
        body : "this is the test message from twilio"
    };
    try {
        const message = await client.messages.create(msgOptions);
        console.log(message);
    } catch (error) {
        console.log(error);
         
    }
}


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

const getAllUsers = async (req, res) => {
    try {
        const {name, email, phone} = req.body;// destructuring the data from the request body
        const user = await otherUserModel.findOne({email});// checking if the user already exists
        const allUsers = await otherUserModel.find();// getting all the users
        console.log(allUsers);
        
        if (user) {
            return res.status(400).json({message: "already exists",succcess:false});//success false means error
        }
        let token_data = await otherUserModel.find().limit(1).sort({'token':-1});// counting the number of documents in the collection
        let token;
        if (token_data.length === 0) {
            token = 1// if no documents are found, then set the token to 1
        } else {
            token = token_data[0].token + 1;// otherwise increment the token by 1
        }
        
        
        const userModel = new otherUserModel({name, email, phone,token});// creating a new user
        // userModel.password = await bcrypt.hash(password,10);// hashing the password and here 10 represents the number of rounds
        await userModel.save();// saving the user to the database
        // sendSMS(phone);

        

        return res.status(200).json({message: "User created successfully",success:true});//success true means no error
    } catch (error) {
        res.status(500).json({message: "Internal server error",success:false});//success false means error
        
    }
}
module.exports = {
    signup,
    login,
    getAllUsers
 }
