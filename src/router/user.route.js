import { Router } from "express";
import passport from "passport";
import * as userControllers from "../controllers/user.controllers.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const routerUser = Router();

routerUser.post('/register', passport.authenticate('register'), userControllers.register);
  
routerUser.post("/login", passport.authenticate('login'), userControllers.login);

routerUser.get("/logout", userControllers.logout);

routerUser.get("/register-gitHub", passport.authenticate("github", { scope: ["user:email"] }));

routerUser.get("/products", passport.authenticate("github", { scope: ["user:email"] }), userControllers.githubResponse);


export default routerUser;