import mongoose from 'mongoose'

async function connectMongoDb(){
   await mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('mongodb connected successfully!!')
   })
   .catch((err)=>{
    console.log('error occur while connecting mongodb !!',err)
   })
   
   
}

export {connectMongoDb}