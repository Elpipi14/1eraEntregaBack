import { Router } from "express";
import * as cartController from "../controllers/cart.contollers.js";

const routerCart = Router();

routerCart.post("/add/:productId", cartController.addToCart);
routerCart.get("/carts", cartController.getCartItems);
routerCart.delete("/carts/:cartItemId", cartController.removeFromCart);

export default routerCart;
