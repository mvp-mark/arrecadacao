import express from "express";
import routes from "./routes";
import { errors } from "celebrate";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errors());

export default app;
