const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const local_user = "myuser";
const local_password = "mypassword";
const key = "secret_key";

router.post('/', (req,res,next) => {
    if (req.body.user == local_user && req.body.pwd == local_password){
        const token = jwt.sign(
            {
                email: "user@aol.com",
                id: 1
            },key, 
            {
                expiresIn: "1h"
            }  
        );
        res.status(201).json({
            msg: "Login page",
            token: token
        });
    }
    else
        res.status(403).json({msg: "Error login in"});
})

module.exports = router;