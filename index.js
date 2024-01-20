import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import taskrouter from './routers/task.router'
import userrouter from './routers/user.router'

const app = express()


app.use(cors())
app.use(express.json())

const port= process.env.PORT || 8002


app.get('/',(req,res)=>{
    res.send('Server is running...')
})

const connectToDatabase =async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas')
    }
    catch(error){
        console.error('Error connecting to MongoDB Atlas:', error);

    }
}
connectToDatabase();

app.listen(port,()=>{
    console.log(`server is running on ${process.env.BASE_URL}`)
})


app.use('/task',taskrouter)
app.use('/users',userrouter)