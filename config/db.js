import mongoose from 'mongoose'

const connectDB = async () => {


    const connect = await mongoose.connect(process.env.MONGO_URI)

    if(connect){
        console.log("Database Succesfuly Connected")
    }


}


export default connectDB;