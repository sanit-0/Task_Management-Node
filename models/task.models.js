import mongoose from "mongoose";
import userModel from '../models/user.model'

const Schema = mongoose.Schema

const TaskSchema = new Schema({
    
    userID:{
        type:Schema.Types.ObjectId,
        // required:true,
        default:null,
        ref:userModel
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()

    },
    status:{
        type:Number,
        default:1
    }
    
    
})

export default mongoose.model('task',TaskSchema)