import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoute from "./routers/auth.route.js"
import userRoute from "./routers/user.route.js"
import gigRoute from "./routers/gig.route.js"
import orderRoute from "./routers/order.route.js"
import conversationRoute from "./routers/conversation.route.js"
import messageRoute from "./routers/message.route.js"
import reviewRoute from "./routers/review.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

mongoose.set("strictQuery", true);
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    handleError(error);
  }
}

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).set(errorMessage);
})

app.listen(8800, () => {
  connect();
  console.log("Backend Server is running");
})

