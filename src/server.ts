import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import fileUpload from "express-fileupload";
import { router } from "./routes";
const app = express();

app.use(cors());
app.use(
  fileUpload({
    limits: {
      fileSize: 1024 * 1024,
    },
  })
);

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      err: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.use(router);

app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  },
  () => {
    console.log("Servidor online");
  }
);
