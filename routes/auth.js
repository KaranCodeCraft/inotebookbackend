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
        jwt_token = jwt.sign(data, jwt_secret)


       return res.json(jwt_token)
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server Error")
    }
})

module.exports = router 