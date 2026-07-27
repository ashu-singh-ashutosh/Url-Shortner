import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { Urlshort, getOriginalUrl } from "./Controllers/Url.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./Views");

mongoose
  .connect(
    process.env.MONGO_URI ||
      "YOUR_MONGODB_CONNECTION_STRING",
    {
      dbName: "Url_shortner",
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(console.log);

app.get("/", (req, res) => {
  res.render("server", {
    shortUrl: null,
  });
});

app.post("/shorten", Urlshort);

app.get("/:shortCode", getOriginalUrl);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

export default app;