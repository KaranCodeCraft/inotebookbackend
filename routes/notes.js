const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

// get all the notes of the user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal server Error")
    }
})

// add the notes to the user                         
router.post('/addnotes', fetchuser, [
    body('tittle', 'tittle should be minimum 3 char long').isLength({ min: 3 }),
    body('discription', 'discription should be minimum 5 char long').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { tittle, discription, tag } = req.body
        const note = new Notes({
            tittle, discription, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal server Error")
    }
})

// Update the notes

router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { tittle, discription, tag } = req.body;

        // creating a new note
        const newnote = {}
        if (tittle) { newnote.tittle = tittle }
        if (discription) { newnote.discription = discription }
        if (tag) { newnote.tag = tag }

        // find the note
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("not found") }

        if (note.user.toString() != req.user.id) {
            return res.status(400).send("bad request")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
        res.json({newnote})

    } catch (error) {
        console.log("in the error block")
        console.error(error.message);
    }
})

module.exports = router     