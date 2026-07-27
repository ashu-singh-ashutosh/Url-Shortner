import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { Urlshort,getOriginalUrl } from './Controllers/Url.js';
dotenv.config();
const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
mongoose
  .connect(
    process.env.MONGO_URI,
    { dbName: "Url_shortner" }
  )
  .then(() => console.log("Mongodb Connected"))
  .catch((error) => {
    console.log(error);
  });
  app.get('/',(req,res)=>{
    res.render('server.ejs',{
        shortUrl:null
        // shortUrl: req.query.shortUrl || null
    })
  })
//   handle url submission
  app.post('/shorten',Urlshort);

//   redirect to the original url using short url
app.get('/:shortCode',getOriginalUrl)
app.listen(PORT,()=>{
    console.log("server is running properly");
})