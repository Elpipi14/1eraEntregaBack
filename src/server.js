import express from "express";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import { Server } from "socket.io"

import { addProduct, deleteProduct, getProducts } from './daos/fileSystem/manager/ProductsData.js'

import productsRouter from './router/products.router.js';
import cartsRouter from './router/cart.router.js'
import viewRouter from './router/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use('/', viewRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpSever = app.listen(8080, () => {
    console.log("escuchando al puerto 8080");
});

const socketServer = new Server(httpSever);

socketServer.on('connection', (socket) => {
    console.log(`Usuario Conectado ${socket.id}`);
    socket.on('disconnect', () => console.log(`Usuario desconectado`));


    socket.on('newProducts', (product) => {
        addProduct(product);
        socketServer.emit('arrayProducts', getProducts()); 
    });

    socket.on('deleteProduct', (productId) => {
        deleteProduct(productId);
        socketServer.emit('arrayProducts', getProducts()); 
    });
})






app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);











