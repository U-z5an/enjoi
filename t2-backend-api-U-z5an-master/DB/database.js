const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/DestinationDecider",{
    useNewUrlParser:true,
    useCreateIndex:true
});
mongoose.Promise = global.Promise;