import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

import todoRoutes from "./routes";
import Todo from './models/todo';


const PORT: string | number = process.env.PORT || 4000

createConnection({
  type: "sqlite",
  database: "./db/kj-db.sqlite",
  entities: [Todo],
  synchronize: true,
}).then(async connection => {
  const app = express(); 

  app.use(express.json());
  app.use(todoRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => console.log(`TypeORM error: ${error}`));
