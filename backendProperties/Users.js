import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        unique: true,
    },
    password:{
        type:String,
       
        
    },
    img:{
        type:String,
    },
    saved: {
        type: [String],
        default:[]
      },
    subscribers:{
        type:Number,
        default:0,
    },
        fromGoogle: {
            type: Boolean,
            default: false,
        }
},

{timestamps: true})

export default mongoose.model("User", UserSchema)