import express from "express";
import cors from "cors";
import { errorHandler } from "../middlewares/errorHandler";

const createServer = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors);
  app.use(express.json());

  //   app.use("/");

  app.use(errorHandler);

  return app;
};

export { createServer };
