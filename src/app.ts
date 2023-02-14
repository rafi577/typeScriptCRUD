
//external module
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

//internal module
import  router  from './userHandler/userHandler';


const app = express();

//express init
dotenv.config();
app.use(express.json());

 const mongo_url = "mongodb+srv://tanvir:tanvir@cluster0.r2x6tgi.mongodb.net/?retryWrites=true&w=majority";
//connecting database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL || mongo_url)
    .then(()=>console.log("database connected"))
    .catch((err:any)=>console.log(err));


//handle routes
app.use('/user',router);




app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}..`);
})