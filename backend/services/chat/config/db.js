import mongoose from "mongoose"
const connecDB=async()=>{
    try{
        await mongoose.connect(process.env.mongoURI)
        console.log("MongoDB connected successfully")
    }catch(error){
        console.log(`db error ${error}`)
    }
}

export default connecDB