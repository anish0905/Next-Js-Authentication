
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    username:{
        type : String,
        required:[true, "Please provide a UserName"],
    },
    email:{
        type:String,
        required:[true , "Please Provide a email"],
        unique: true
    },
    password:{
        type : String,
        required : [true , "Please Enter the password"]
    },
    isVerified:{
        type:Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default:false
    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date ,
    verifyToken: String ,
    verifyTokenExpiry:Date,

})

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User ; 