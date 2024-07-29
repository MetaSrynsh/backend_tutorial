import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    watchHistory:{
        type:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Video"
            }
        ],   //array of object (videos)
        required: true
    },
    userName:{
        type:String,
        required:true, 
        unique: true,
        trim: true,
        index: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true,
    },
    fullName:{
        type:String,
        required:true,
        trim: true,
        index: true
    },
    avatar:{
        type:String,    //cloudinary url
        required:true
    },
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type:String,
    },
},{
    timestamps: true
});


userSchema.pre("save", async function(next){
    if(! this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}


//Generate Access Token
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}


//Generate Refresh Token
userSchema.methods.generatefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}



const User = mongoose.model("User", userSchema);
module.exports = User;