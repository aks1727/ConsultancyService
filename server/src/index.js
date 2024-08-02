import dotenv from 'dotenv'
import connectDb from './db/db1.js'
import app from './app.js'

dotenv.config({
    path:'./.env'
})



/**
 * Do not modify any code in this file
 */

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,console.log(`Server listening on http://localhost:${process.env.PORT}`))
    app.on('error',(err)=>{
        console.log(err.message)
        throw err;
    })
})
.catch((err)=>{
    console.log(err.message)
})