const mongoose = require('mongoose')
const { Schema } = mongoose

const NotesSchema = new Schema({
    // this will take the reference from the user module and save the object id from the user module to the notes so that we can verify which notes belongs to which user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tittle: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('notes', NotesSchema)