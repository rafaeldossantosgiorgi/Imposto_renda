import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database";
import { userRouter } from "./routes/user.routes";
import { errorHandler } from "./middlewares/error";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.use(errorHandler);

AppDataSource.initialize().then(() => {
  console.log("Database initialized");
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error("Error initializing database:", error);
});