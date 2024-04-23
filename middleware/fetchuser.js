const jwt = require('jsonwebtoken');
jwt_secret = "thisisthepython"

const fetchuser = (req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error: "please authenticate using a valid token"})
}
try{
    const data = jwt.verify(token, jwt_secret)
    req.user = data.user
    // this return the data which we have stored in the data whiche sending the json token and then we get issued at time 
    // console.log(data)
    next()
}
catch(err){
    console.error(err);
    res.status(401).send({error: "please authenticate using a valid token"})
}
}

module.exports = fetchuser