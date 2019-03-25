const jwt = require('jsonwebtoken');
const key = "secret_key";

const result = (req,res,next) => {
    console.log(`On Token Verify MiddleWare ${req.headers.authorization}`);
    try{        
        const res = jwt.verify(req.headers.authorization.split(' ')[1], key);
        next();
    } catch (error){
        console.log("On Token Verify MiddleWare: ERROR");
        res.status(403).json({message: "Forbidden"});
    }
};

module.exports = result;