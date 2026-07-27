import shortid from "shortid";
import { Url } from "../Models/Url.js"
export const Urlshort=async(req,res)=>{
const longUrl=req.body.longUrl;
const shortCode=shortid.generate();
// const shortUrl=`http://localhost:3000/${shortCode}`
const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
// save to db
const newUrl=new Url({shortCode,longUrl});
await newUrl.save();
console.log("url stored successfully",newUrl);
res.render("server.ejs",{shortUrl});
// res.redirect(`/?shortUrl=$.{encodeURIComponent(shortUrl)}`);

}
export const getOriginalUrl=async(req,res)=>{
      const shortCode=req.params.shortCode;

    //   now find the longUrl in db
    const UrlRecord=await Url.findOne({shortCode})
    console.log(UrlRecord);
    if(UrlRecord){
        res.redirect(UrlRecord.longUrl)
    }
    else{
        res.status(404).send("url can not be found")
    }
}