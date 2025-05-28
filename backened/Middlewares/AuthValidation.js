const Joi = require('joi');

const signupValidation = (req,res,next)=>{
    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request",error});
    }
    next();
}

const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        // name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request",error});
    }
    next();
}

const otherUserValidation = (req,res,next)=>{
    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        phone : Joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request",error});
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation,
    otherUserValidation
}