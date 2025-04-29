
const express=require('express')
const fs=require('node:fs')

const router=express.Router()

router.get('/:imageName',(req,res)=>{
    const {imageName}=req.params
    const path=__dirname+'/../images/'+imageName
    const data=fs.readFileSync(path)
    res.send(data)
})

module.exports=router

