const express=require('express')
const jwt=require('jsonwebtoken')
const result=require('./utils/result')
const config=require('./utils/config')
const authorization=require('./routes/authorization')
const userRouter=require('./routes/user')
const categoryRouter = require('./routes/category');
const bookingsRouter=require('./routes/booking')
const imageRouter=require('./routes/image')
const cryptoJs=require('crypto-js')


const propertyRouter=require('./routes/property')

const app=express()

app.use(express.json())
app.use(authorization)

app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/property',propertyRouter)
app.use('/bookings',bookingsRouter)
app.use('/image',imageRouter)
app.listen(4000, 'localhost', () => {
    console.log('Server started ');
  });