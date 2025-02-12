import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error when listening: `, error);
    });

    app.listen(`${process.env.PORT}`);
  })
  .catch((error) => console.log(error, "MONGODB Connection failed"));
