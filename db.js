import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/dbcrud')
        console.log('mongodb database connected')
    }
    catch (err) {
        console.log('error occured while connecting to database')
    }
}

