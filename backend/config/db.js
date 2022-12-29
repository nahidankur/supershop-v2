import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.URL, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log('Mongodb Connected...')

    } catch(err){
        console.error(err)
    }

}

connectDB()