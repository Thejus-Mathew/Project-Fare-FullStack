const mongoose = require('mongoose')
const connectionString=process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log("mongoDB connection successfull");
    
}).catch((err)=>{
    console.log("mongoDB connection failed",err);
    
})