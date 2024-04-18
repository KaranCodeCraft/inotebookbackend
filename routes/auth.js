const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator')

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

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then((user)=>{
            console.log("user saved sucessfully");
            res.json(user)
        }).catch((err)=>{
            res.json({error: "Please enter a valid email",message: err.errmsg})
        })
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server Error")
    }
})

module.exports = router 