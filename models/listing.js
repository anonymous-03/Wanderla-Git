const mongoose = require("mongoose");
const imglink="https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg";
const Review=require("./reviews");
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    image: {
        filename:{
            type:String,
            default:"abc"
        },
        url:{
            type:String,
            set:(v)=> v===""?imglink:v,
            default:imglink,
        },
      
        
        
    },
price: {
    type: Number,
    min: 500
},
location: {
    type: String,
    required: true
},
country: {
    type: String,
    required: true
},
reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }
],
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},

geometry:{
    type:{
        type:String,
        default:'Point',
        enum:['Point'],
        required:true
    },
    coordinates:{
        type:[Number],
        default:[79,22]
    }
}
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing)await Review.deleteMany({_id:{$in:listing.reviews}})
})
const Listing = new mongoose.model("listing", listingSchema);


module.exports = Listing;