import express from "express";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import { Server } from "socket.io"

import viewRouter from './router/views.router.js';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/cart.router.js'
import { addProduct, deleteProduct, getProducts } from './manager/ProductsData.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

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
    socket.emit('saludo desde back', 'Bienvenido a WebSocket')

    socket.on('newProducts', (product) => {
        addProduct(product);
        socketServer.emit('arrayProducts', getProducts()); 
    });

    socket.on('deleteProduct', (productId) => {
        deleteProduct(productId);
        socketServer.emit('arrayProducts', getProducts()); 
    });
})

app.use('/', viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);











