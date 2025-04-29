const express=require('express')
const router =express.Router()
const pool=require('../db/mysql')
const result=require('../utils/result')


const multer=require('multer')
const upload=multer({dest:'images'})

router.post('/',upload.single('image'),(req,res)=>{
    const{categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent}=req.body
 const sql=`insert into property(categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent,profileImage)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
pool.execute(sql,[1,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent,req.file.filename],(error,data)=>{
    res.send(result.createResult(error,data))
})
})

router.get('/',(req,res)=>{
    const sql=`select id,title,contactNo,ownerName,rent,profileImage from property `
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.put('/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const{title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent}=req.body
    let sql = `
    UPDATE property SET title = ?, details = ?, address = ?, contactNo = ?, ownerName = ?,isLakeView = ?, isTV = ?, isAC = ?, isWifi = ?, isMiniBar = ?, isBreakfast = ?, isParking = ?,guests = ?, bedrooms = ?, beds = ?, bathrooms = ?, rent = ?, profileImage = ? where id=?`;
        pool.execute(sql,[title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent,req.file.filename,id],(error,data)=>{
    res.send(result.createResult(error,data))
})
})

     


router.get('/details',(req,res)=>{
    const {id} = req.body
    const sql = ` Select details from property where id = ?`
    pool.query(sql,[id],(error,data)=>{
        res.send(result.createResult(error,data))
   })
})


module.exports=router