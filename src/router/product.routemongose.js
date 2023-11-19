import { Router } from "express";
import * as controller from "../controllers/products.controllers.js";

const routerMongo = Router();

routerMongo.get("/", controller.getAll);

routerMongo.get("/:id", controller.getById);

routerMongo.post("/", controller.createProduct);

routerMongo.put("/:id", controller.updateProduct);

routerMongo.delete("/:id", controller.deleteProduct);

export default routerMongo;