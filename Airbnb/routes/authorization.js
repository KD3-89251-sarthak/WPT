const jwt= require('jsonwebtoken')
const result=require('../utils/result')
const config =require('../utils/config')
 function authorization(req,res,next){
    if(req.url =='/user/signin'||req.url =='/user/signup')
        next()
    else{
    const token = req.headers.token
    if(!token)
        res.send(result.createErrorResult('missing token'))

    else{
        try{
            const payload=jwt.verify(token,config.secret)
            req.headers.id = payload.id
            
            console.log(payload)
            next()
        }
        catch{
            res.send(result.createErrorResult('invalid token'))
        }
          
    }
    }

 }
 module.exports=authorization