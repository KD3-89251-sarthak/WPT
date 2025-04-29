const express= require('express');
const router=express.Router()
const pool=require('../db/mysql')
const result=require('../utils/result')

//load the multer module
const multer =require('multer');

//crete uplaod middleware 
const upload =multer({dest:'image'})


router.get('/',(req,res)=>{
    const sql=`select id,title,details,image from category;`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.post('/',upload.single('icon'), (req,res)=>{
    const {title,details}=req.body
    const fileName=req.file.filename
    const sql=`insert into category(title,details,image)values(?,?,?)`
    pool.execute(sql,[title,details,fileName],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})
module.exports=router