import mongoose from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String,    //coudinary url
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    duration:{
        type:Number,
        required: true
    },
    views:{
        type:Number,
        default: 0,
        required: true
    },
    videoFile:{
        type:String,
        default: true
    },
    isPublished:{
        type:bool,
        required: true
    },
},{
    timestamps: true
});

videoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;