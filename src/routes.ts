import express from "express";
const { celebrate, Segments, Joi } = require("celebrate");

import multer from "multer";
import multerConfig from "./config/multer";

import ArquivoController from "./controllers/ArquivoController";

const arquivoController = new ArquivoController();

const routes = express.Router();
const upload = multer(multerConfig);

// routes.post('/sessions', SessionController.create);

// routes.get("/post", upload.single("arr"), ArquivoController.index);
routes.post("/post", upload.single('arr'), arquivoController.create);
routes.get("/", arquivoController.index);

export default routes;
