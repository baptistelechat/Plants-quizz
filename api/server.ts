import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import plantRouter from "./src/routes/plant.routes";

dotenv.config();

// Express App
const app: Express = express();
const port = process.env.PORT;

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL_LOCAL as string,
      process.env.FRONTEND_URL_PUBLIC as string,
    ],
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ limit: "50mb" }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const reqColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bgCyan";
      case "POST":
        return "bgGreen";
      case "DELETE":
        return "bgRed";
      case "PATCH":
        return "bgYellow";
      default:
        return "bgWhite";
    }
  };

  console.log(chalk[reqColor(req.method)](req.method, req.path));
  next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "🌍 Welcome to the app !" });
});

app.use("/api/plant", plantRouter);

// Listen requests
app.listen(port, () => {
  console.log(
    chalk.yellow(`⚡️[server]: Server is running at http://localhost:${port}`)
  );
});
