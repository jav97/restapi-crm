const SessionController={};
const config = require('../config');
const Session=require("../models/Session");
const User=require('../models/User');
const jwt = require('jsonwebtoken');

SessionController.ckeckAuth=async(req,res,next)=>{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]
        console.log(token);
      }else{
        return res.json({
                  success: false,
                  message: 'Auth token is not supplied'
                });
      }
      
     if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
}
SessionController.login=async(req,res)=>{
    const {username,password}=req.body;    
    const user = await User.findOne({username:username, password:password});
    
    if(user.username != "" && user.password != "") {
      
      if(user.username === username && user.password){
          let token = jwt.sign({username: username},
            config.secret,
            { expiresIn: '24h',
            }
          );
        res.json({
        mensaje: 'Autenticación correcta',
        token: token
        });
      }        
    }else{
      
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }

}


SessionController.logout=async(req,res)=>{
   
}

module.exports=SessionController;
