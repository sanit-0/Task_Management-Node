import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
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
});

export default mongoose.model('user',UserSchema)