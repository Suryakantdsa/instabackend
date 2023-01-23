const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    likes:{
        type:Number,
        default:40
    },
    description:{
        type:String,

    },
    image:{
        type:String,

    },
    date:{
        type:String,
        default:" 09/01/2023",
        require:true
    }
})

// const postModel=

module.exports={postSchema:mongoose.model("InstaUser",postSchema)};