const express = require('express') 
const userCtrl =require('../Controller/user.js')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function (res, file, cb){
        return cb(null,'profileImg')
},
 filename:function (res, file, cb){
    return cb(null, `${Date.now()}- ${file.originalname}`)

}}) 

const upload = multer({storage})

router
.post('/uploadImg',upload.single('profileImg'),userCtrl.uploadImg)
.post('/login',userCtrl.loginUser)
.post('/signin',userCtrl.createUser)
.post('/getuser',userCtrl.getUserDetail)

exports.router=router