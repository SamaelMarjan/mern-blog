const { hashPass, comparePassword } = require('../helpers/authHelper')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

//create user
module.exports.createUser = async(req, res) => {
    try {
        const {username, email, password, confirmpassword} = req.body
        //validations
        if(!username) return res.json({message: 'Username required'})
        if(!email) return res.json({message: 'Email required'})
        if(!password) return res.json({message: 'Password required'})
        if(confirmpassword !== password) return res.json({message: 'Password and confirm password should be same'})
        //check existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser) return res.json({message: 'Email already registered'})
        //hash password
        const hash = await hashPass(password)
        //create user
        const user = await userModel({...req.body, password: hash, confirmpassword: hash }).save()
        // Exclude password and confirm password from the response
        user.password = undefined
        user.confirmpassword = undefined
        res.status(200).json({
            success: true, message: 'User created successfully', user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something went wrong when creating user'
        })
    }
}

//login user
module.exports.loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        //validations
        if(!email) return res.json({message: 'Email required'})
        if(!password) return res.json({message: 'Password required'})
        //check user
        const user = await userModel.findOne({email})
        if(!user) return res.json({message: 'Email not registered'})
        //compare hash password
        const compare = await comparePassword(password, user.password)
        //check compare password
        if(!compare) return res.json({message: 'Password not matched'})
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        // Exclude password and confirm password from the response
        user.password = undefined
        user.confirmpassword = undefined
        res.status(200).json({
            success: true, message: 'Login successfull', user, token
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something went wrong when try to login'
        })
    }
}