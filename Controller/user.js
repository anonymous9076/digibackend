const newUserModel = require('../Model/user.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
   //step 0 check feild emptyness
   //step 1 check weather user is already there or not 
   //step 3 encrypt the password by bycrypt.js
   //step 2 make  a new instance of model 
   //step 4 add information
   //step 5 save it using save()

   const { email, password, firstname, lastname, dob, gender, institute, qualification } = req.body
   if (!email || !password) {
      res.josn({ "status": "feilds are empty" })
   }
   const user = await newUserModel.findOne({ email })
   if (user) {
      res.json({ 'status': "email already exist" })
   }
   else {
      const hashedpass = await bcryptjs.hash(password, 10)
      const accesstoken = jwt.sign({
         user: {
            email: email,
            firstname: firstname
         }
      }, (process.env.secret_key), { expiresIn: '7d' })

      const newuser = new newUserModel({
         email,
         token: accesstoken,
         password: hashedpass,
         firstname,
         lastname,
         dob,
         gender,
         institute,
         qualification
      })
      newuser.save()
      if (newuser) {
         res.json({ "status": 'successfully Created' })
      }
   }

}
exports.loginUser = async (req, res) => {
   //step 1 check input field
   //step 2 check email existance
   //step 3 decrypt password
   // step 4 check weather both are valid or not 
   //step 5 make a token for next session
   const { email, password } = req.body
   if (!email || !password) {
      res.json({ 'status': 'input feild is empty' })
   }
   const loguser = await newUserModel.findOne({ email })
   if (loguser) {
      const decryptPass = await bcryptjs.compare(password, loguser.password) // first is entered one 2nd is saved one
      if (loguser && decryptPass) {
         const accesstoken = jwt.sign({
            user: {
               email: loguser.email,
               firstname: loguser.firstname
            }
         }, (process.env.secret_key), { expiresIn: '7d' })
         res.status(200).json(loguser)
      }
      else {
         console.log('false')
         res.json({ "status": 'invalid password' })
      }
   }
   else {
      res.status(404).json({ "status": 'invalid email & password' })
   }
}

exports.getUserDetail = async (req, res) => {
   const { email } = req.body
   const user = await newUserModel.findOne({ email })
   res.json(user)
}
exports.uploadImg = async (req, res) => {
   const image = req.file.path
   const email = req.body.email
   try{
   await newUserModel.updateOne(
      { email: email },{
      $set: {
         profileImg : image
   }}
   )
   res.json(image)
}
   catch(error){
      res.json('unable to update Image')
   }
}