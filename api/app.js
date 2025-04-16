import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import propRoute from "./routes/prop.route.js";
import testRoute from "./routes/test.routes.js"
import userRoute from "./routes/user.route.js";


const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/prop", propRoute);
app.use("/api/user", userRoute);
app.use("/api/test", testRoute);

export default app;

app.listen(8800, () => {
  console.log("Server is on port 8800!");
});