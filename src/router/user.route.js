import { Router } from "express";
import * as userControllers from "../controllers/user.controllers.js";
import { validateLogIn } from "../middlewares/validateLogin.js";

const routerUser = Router();

routerUser.post('/register', userControllers.register);

routerUser.post("/login", userControllers.login);

routerUser.get("/info", userControllers.login);

router.get("/secret-endpoint", validateLogIn, visit);

routerUser.post("/logout", userControllers.logout);


export default routerUser;