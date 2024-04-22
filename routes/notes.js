const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Notes = require('../models/Notes')
const {body, validationResult} = require('express-validator')

// get all the notes of the user
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal server Error")
    }
})

// add the notes to the user                         
router.post('/addnotes',fetchuser,[
    body('tittle', 'tittle should be minimum 3 char long').isLength({min: 3}),
    body('discription', 'discription should be minimum 5 char long').isLength({min: 5}),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const {tittle, discription, tag} = req.body
        const note = new Notes({
            tittle, discription, tag , user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal server Error")
    }
})

// Update the notes



module.exports = router     