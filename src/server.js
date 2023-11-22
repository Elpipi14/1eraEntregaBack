import express from "express";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import viewRouter from './router/views.router.js';
import { Server } from "socket.io"

//conecta con socket.io en fileSystem
import { updateProduct, deleteProduct, getAll } from './daos/fileSystem/manager/ProductsData.js';

//Conexion con mongo y logica para trabjar con post
import { initMongoDB } from "./daos/mongoseDb/connection.Mongose.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import routerMongo from "./router/product.routemongose.js";
import routerCart from "./router/cart.mongo.js";

// Express conexion con public
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewRouter);
app.use(errorHandler);

//Router Mongo
initMongoDB()
app.use('/products', routerMongo);
app.use('/carts', routerCart);

// conexion HTTP
const httpSever = app.listen(8080, () => {
    console.log("escuchando al puerto 8080");
});

// logica Socket
const socketServer = new Server(httpSever);

socketServer.on('connection', (socket) => {
    console.log(`Usuario Conectado ${socket.id}`);
    socket.on('disconnect', () => console.log(`Usuario desconectado`));


    socket.on('newProducts', (product) => {
        updateProduct(product);
        socketServer.emit('arrayProducts', getAll());
    });

    socket.on('deleteProduct', (productId) => {
        deleteProduct(productId);
        socketServer.emit('arrayProducts', getAll());
    });
});


