import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CORS, credentials: true }));

app.use(express.json());

import userRouter from "./routes/users.route.js";
import adminRouter from "./routes/admins.route.js";
import courseRouter from "./routes/courses.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/admins", adminRouter);

export { app };
