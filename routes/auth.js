const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

jwt_secret = "thisisthepython"

router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({min:5}),
],async (req,res)=>{
    try {
        const errors = await validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }

        let check1 = req.body.email
        let rescheck1 = await User.findOne({email: check1})
        if(rescheck1){
           return res.status(200).json({message: "user already exists"})
        }
        // normal meathod to put data in the database

        // const user = new User(req.body)
        // await user.save()
        // return res.send(req.body)

        // Creating the hash password for the safety

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id}
        }
        auth_token = jwt.sign(data, jwt_secret)


       return res.json(auth_token)
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server Error")
    }
})

// Login end point no auth required

router.post('/login', [
    body('email', 'email can not be empty').notEmpty(),
    body('password', 'password can not be blank').notEmpty()
],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.send("please log in with the correct credentials")
        }
        if(user){
            const passwordCompare = await bcrypt.compare(password,user.password)
            if(!passwordCompare){
                return res.send("please log in with the correct credentials")
            }
            if(passwordCompare){
                const data = {
                    user: {
                        id : user.id
                    }
                }
                const auth_token =  jwt.sign(data,jwt_secret)
                return res.json(auth_token)
            }
        }
        
    } catch (error) {
        console.error(error.message);
        return res.send("Internal server Error") 
    }
})

module.exports = router 