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

app.listen(process.env.PORT, () => {
    console.log("Servidor online");
  }
);
