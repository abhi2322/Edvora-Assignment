const mongoose=require('mongoose');
const { MONGO_URI } = process.env;

//connecting to MongoDB server
exports.connect = ()=>{
    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("successfully connected to databse")
    })
    .catch((error)=>{
        console.log("Connection Failed...")
        console.error(error);
        process.exit(1);
    });
}