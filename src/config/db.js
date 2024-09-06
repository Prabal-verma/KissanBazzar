import mongoose from 'mongoose'

const connectDB= async ()=>{
    try{
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongoDB")
        

    }catch(error){
        console.error(`ERROR is:${error.message}`);
        process.exit(1)

    }
};

export default connectDB;