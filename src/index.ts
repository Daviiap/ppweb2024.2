import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";

async function main() {
  dotenv.config({
    path: "./.env",
  });
  const app = express();
  const router = express.Router();

  router.route("/").get((_: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use(router);
  app.use(express.json());
  app.use(cors({ origin: "*" }));

  app.listen(process.env.PORT);
}

main()
  .then(() => {
    console.log("server started successfully!");
  })
  .catch((err) => {
    console.error("error starting server: ", err);
  });
