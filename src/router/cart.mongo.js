import { Router } from "express";
import * as cartController from "../controllers/cart.contollers.js";

const routerCart = Router();

routerCart.post("/add/:productId", cartController.addToCart);
routerCart.get("/", cartController.getAll);
routerCart.delete("/:cartItemId", cartController.deleteProduct);
routerCart.delete("/", cartController.clearCart);

export default routerCart;
