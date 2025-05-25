
const mongoose=require("mongoose");

const reviewsSchema= new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    created_at:{
        type:Date,
        default: Date.now()
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
})

const Review=mongoose.model("Review", reviewsSchema);

module.exports=Review;

