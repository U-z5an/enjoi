const http = require('http');
const app=require("./app");

// const port=process.env.PORT || 7777;
const server = http.createServer(app);
app.listen(7777, function(){
    console.log("server has started.")
});
