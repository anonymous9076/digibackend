const express = require('express');
const server = express();
const bodyParser = require ('body-parser')
require('dotenv').config()
const cors = require('cors')
const multer = require('multer')
const userRoute = require('./Router/user.js')
const notesRoute = require('./Router/notes.js')
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: 'dx2pchg1f',
//   api_key: '572669552582811',
//   api_secret: 'b2SCshmLesSh2-6ytc7oU8CQztk'
// });

const mongoose = require('mongoose')

database().catch((err) => console.log('failed to connect',err))
async function database(){
    await mongoose.connect(`mongodb+srv://tushar915:${process.env.PASSWORD_DB}@cluster0.ihjuf05.mongodb.net/diginoteDB`)
    console.log('successfully connected')
}

server.use('/uploads',express.static('uploads'))
server.use('/profileImg',express.static('profileImg'))
server.use(express.urlencoded())
server.use(cors())
server.use(bodyParser.json())
server.use(express.json())
const myMiddleware=(req,res,next)=>{
    next();
}



server.use('/user',userRoute.router)
server.use('/note',notesRoute.router)


server.listen(process.env.PORT, () => {
    console.log('hi there')
})