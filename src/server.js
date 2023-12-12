import express from "express";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import viewRouter from './router/views.router.js';

//Conexion con mongo y logica para trabjar con post
import { initMongoDB } from "./daos/mongoseDb/connection.Mongose.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import routerMongo from "./router/product.route.js";
import routerCart from "./router/cart.route.js";

initMongoDB()
//LOGIN
import routerUser from "./router/user.route.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mongoStoreOptions } from "./utils.js";
import passport from "passport";
import "./passport/strategie.js"
import "./passport/gitHub-strategie.js"
// Express conexion con public
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Handlebars
const hbs = handlebars.create({
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
});

app.use(cookieParser());
app.use(session(mongoStoreOptions));



app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(errorHandler);

app.use(passport.initialize());
app.use(passport.session());
app.use('/', viewRouter);
//login
app.use('/', routerUser);

app.use('/api/products', routerMongo);
app.use('/api/carts', routerCart);


// conexion HTTP
const httpSever = app.listen(8080, () => {
    console.log("escuchando al puerto 8080");
});