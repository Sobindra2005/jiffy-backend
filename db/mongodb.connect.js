const mongoose=require('mongoose')

async function connectMongoDb(url){
   await mongoose.connect(`${url}`).then(()=>{
    console.log('mongodb connected successfully!!')
   })
   .catch((err)=>{
    console.log('error occur while connecting mongodb !!',url,err)
   })
   
   
}

module.exports={connectMongoDb}