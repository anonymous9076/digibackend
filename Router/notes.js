const express = require('express')
const router = express.Router()
const notesController = require('../Controller/notes.js')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        return cb(null, 'uploads')
    },
    filename: function (res, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router
    .get('/alldata', notesController.getAllNotes)
    .post('/uploadNotes', upload.single('my_file'), notesController.uploadNotes)
    

exports.router = router