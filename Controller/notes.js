const notesModel = require('../Model/notes.js')


//get data
exports.getAllNotes = async (req, res) => {
    const notes = await notesModel.find({})
    res.json(notes)
}
exports.getMyUploadedNotes = async (req, res) => {
    const email = req.body
    console.log(email)
    const notes = await notesModel.find({'email': email })
    if (notes) {
        res.json(notes)
    }
    else {
        res.json('No Uploads yet')
    }
}

exports.uploadNotes = async (req, res) => {
    if (req.file.mimetype === 'application/pdf') {
        const newNote = new notesModel(
            {
                ...req.body,
                my_file: req.file.path
            })
        newNote.save()
            .then(() => {
                if (newNote) {
                    res.json({msg:'Congratulations !'})
                }
                else {
                    res.json({msg:'Something went wrong, Try again'})

                }
            })
            .catch((err) => {
                res.json({err:err})
            })
    }
    else {
        res.json({msg:'choose a valid pdf file'})
    }
}
