const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const packageSchema=mongoose.Schema({
    PackageName:{
        type:String
    },
    TravelDays:{
        type:String
    },
    TravelCost: {
        type: String
    },
    Guide:{
        type: String
    },
    image:{
        type:String
    }
});

const Package=mongoose.model("Package",packageSchema);
module.exports=Package;