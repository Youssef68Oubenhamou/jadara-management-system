// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// dotenv.config()
// const db = process.env.MONGODB_URI
// // console.log(process.env);

// export const connectDB = async ()=>{
//     try {
//         const connect = await mongoose.connect(db)
//     } catch (error) {
//        console.log("connection failed!!") 
//     }
// }

// const app = express();
// dotenv.config()
// const port = process.env.PORT
// const db = process.env.MONGODB_URI
// app.get('/',(req,res)=>{
//     res.send("Hello Sparadra!")
// })
// app.get("/register",(req,res)=>{
//     res.send("Hello agaiin")
// })

// app.listen(port,()=>{
//     connectDB();
//     console.log(`your app is running on port ${port}`)
// })
// app.use(cors());
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// console.log(app);
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"
import courseRoutes from "./routes/courses.js"


dotenv.config(); // Load .env variables first


const app = express();
const port = process.env.PORT || 5000; // Fallback in case PORT is not set
const db = process.env.MONGODB_URI;

// Middleware setup
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/',userRoutes);
app.use('/course',courseRoutes);

// Database connection function
mongoose.connect(db)
    .then(() => app.listen(port , () => {

    // Start the server only after DB is connected
        console.log("Connected to DB successfuly !");
        console.log(`Server is running on ${port}`)

    }))
    .catch((err) => {

        console.log(err.message);

    });
