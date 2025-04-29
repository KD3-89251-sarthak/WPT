const express=require('express')
const router=express.Router()
const pool=require('../db/mysql')
const result=require('../utils/result')
const config =require('../utils/config')
const { error } = require('console')

router.get('/',(req,res)=>{
    const sql =`select * from bookings`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.post('/',(req,res)=>{
    const {propertyId,total,fromDate,toDate}=req.body
    console.log(req.body)
    const sql=`insert into bookings(userId,propertyId,total,fromDate,toDate)values(?,?,?,?,?)`
    pool.execute(sql,[req.headers.id,propertyId,total,fromDate,toDate],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})
module.exports=router