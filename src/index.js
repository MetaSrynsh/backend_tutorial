// require("dotenv").config({path: "./env"});
// privious version

//new version
import dotenv from "dotenv"


import mongoose from "mongoose";
// import {DB_NAME} from "./constants";

import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log("server is running")
    })
})
.catch((err)=>{
    console.log("SERVER IS NOT RUNNING ", err);
})


//1st approach

// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     }
//     catch (error){
//         console. log("ERROR", error);
//         throw error;
//     }
// })()