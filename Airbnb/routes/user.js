const express=require('express')
const pool=require('../db/mysql')
const jwt=require('jsonwebtoken')
const cryptoJs=require('crypto-js')
const result=require('../utils/result')

const config= require('../utils/config')
const { error } = require('console')

const router=express.Router()

router.post('/registration',(req,res)=>{
    const{ firstName, lastName,email,password,phone}=req.body
    const encryptedPassword=cryptoJs.SHA256(password).toString()
    const sql=`insert into user (firstName,lastName,email,password,phoneNumber)values(?,?,?,?,?)`
    pool.execute(sql,[firstName,lastName,email,encryptedPassword,phone],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


router.post('/login',(req, res)=>{
const {email ,password}=req.body
const encryptedPassword=cryptoJs.SHA256(password).toString()
const sql=`select * from user where email =? and password= ?`
pool.query(sql,[email,encryptedPassword],(error,data)=>{
    if(error){
        res.send(result.createErrorResult(error))
    }
    else if(data.length !=0){
        const user=data[0]
        const payload ={id:user.id}
        const token=jwt.sign(payload,config.secret)
        const userData={
            firstName:user.firstName,
            lastName:user.lastName,
            token:token
        }
        res.send(result.createResult(null, userData))

    }
    else {
        res.send(result.createErrorResult('Invalid email or password'))
    }
        
})
})

router.get('/profile',(req,res)=>{
    const sql=`select * from user `
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.put('/profile',(req,res)=>{
    const{firstName,lastName,phone}=req.body
    console.log(req.body+""+req.headers.id)
    const sql=`update user set firstName=?, lastName=? , phoneNumber=? where id=?`
    pool.execute(sql,[firstName,lastName,phone,req.headers.id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


  router.delete('/:id', (req, res) => {
    const { id } = req.params; // Get user id from URL
    const sql = 'UPDATE user SET isDeleted = 1 WHERE id = ?'; // Update query
    pool.execute(sql, [id], (error, data) => {
    res.send(result.createResult(error,data))
    })
  })
module.exports=router
