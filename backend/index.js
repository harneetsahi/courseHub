import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CORS, credentials: true }));

app.use(express.json());

import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/users", userRouter);
app.use("/admins", adminRouter);

export { app };
