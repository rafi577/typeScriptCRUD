"use strict";
//external modules
const routeExpress = require('express');
const userMongoose = require('mongoose');
const bcrypt = require('bcrypt');
//internal modules
const schema = require('../Schema/userSchema');
const user = new userMongoose.model('user', schema);
const router = routeExpress.Router();
router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send("ok");
});
router.get('/', (req, res) => {
    console.log(req.body);
    res.end("get");
});
module.exports = router;
/**
 *
 * router.post('/signup',async (req:any,res:any)=>{
    try{
        const hashPassword = await bcrypt.hash(req.body.password,10);
        const newUser = new user({
            _id: req.body._id,
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPassword,
            userType: req.body.userType,
            status: req.body.status,
            updated_at: req.body.updated_at,
            created_at: req.body.created_at
        })
        console.log(newUser);
        await newUser.save();
        res.status(200).json({
            message : "signup successful."
        });
    }
    catch{
        res.status(500).json({
            message : "signup failed!"
        });
    }
})

 *
 */ 
