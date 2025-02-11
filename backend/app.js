import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CORS, credentials: true }));

app.use(express.json());

import userRouter from "./routes/users.route.js";
import adminRouter from "./routes/admins.route.js";
import courseRouter from "./routes/courses.route.js";

app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/admins", adminRouter);

export { app };
