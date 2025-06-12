import express from "express";
const app = express();
import dotenv from "dotenv";
import { dbconnection } from "./Config/mongoDB.js";
import cors from "cors";
import routesuser from "./Routes/authRoutes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
dotenv.config();
// console.log(process.env);

app.use(morgan("dev"));
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://82cd-2a02-cb80-40bc-a912-34ab-e561-dbd5-804b.ngrok-free.app", 
    ],
    credentials: true, 
  })
);
dbconnection();
app.use(cookieParser());
// console.log(`mongo.durl:${process.env.dbconnection}`)

app.use("/api", routesuser);


app.get("/",(req,res)=>{
  res.send("dekho browser pe b chal gya hai")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
