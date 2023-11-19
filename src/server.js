import express from "express";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import { initMongoDB } from "./daos/mongoseDb/connection.Mongose.js";

import { updateProduct, deleteProduct, getAll } from './daos/fileSystem/manager/ProductsData.js'

import productsRouter from './router/products.router.js';
import cartsRouter from './router/cart.router.js'
import viewRouter from './router/views.router.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import routerMongo from "./router/product.routemongose.js";

const app = express();
initMongoDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);

//Router Mongo
app.use('/products', routerMongo); 

const httpSever = app.listen(8080, () => {
    console.log("escuchando al puerto 8080");
});

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

app.use(errorHandler);