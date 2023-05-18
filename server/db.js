const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
     await mongoose.connect(process.env.MONGO_URI)
     console.log(`connected to the database ${mongoose.connection.host}`)
    }catch(err){
        console.log(`mongoDb Database Error ${err}`)
    }
}
module.exports=connectDB