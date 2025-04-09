import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.routes.js"



const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

export default app;

app.listen(8800, () => {
  console.log("Server is on port 8800!");
});