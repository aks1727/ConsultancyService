import mongoose from 'mongoose'
import { DB_Name } from '../constants.js'

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`);
        if(connection){
            console.log(`MongoDb connection success for ${connection}`)
        }
        else throw new Error("MongoDb connection error :: connectDb() ",err.message)
    } catch (error) {
        console.log(error.message)
    }
}
export default connectDb;