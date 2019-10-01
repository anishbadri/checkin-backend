const express = require("express")
const User =  require('../models/user')
const router = express.Router()

const mongoose = require('mongoose')
const db = "mongodb+srv://anish:abc@checkindb-3ouom.mongodb.net/checkindb?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if(err){
        console.log("Error "+ err);
    } else{
        console.log("COnnected to Mongo DB");
    }
});
router.get('/',(req,res) => {
    res.send("from API")
})

router.post("/register", (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        } else{
            res.status(200).send(registeredUser)
        }
    })
})


router.post('/login', (req, res) => {
    let inputUserData = req.body
    User.findOne({email: inputUserData.email}, (error, user) => {
        if(error){
            console.log(error);
        } else {
            if(!user){
                res.status(401).send("Invalid Email");
            } else 
            if(user.password == inputUserData.password){
                res.status(200).send(user)
            } else{
                res.status(401).send("Invalid Password");
            }
        }
    })
})

module.exports = router