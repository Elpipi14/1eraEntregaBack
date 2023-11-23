import { Router } from "express";
import { getProducts } from "../daos/fileSystem/manager/productsManager.js";
import ProductMongoDB from "../daos/mongoseDb/Products/products.mongose.js";
import CartMongoDB from "../daos/mongoseDb/Products/carts.mongose.js"
const prodDao = new ProductMongoDB();
const cartDao = new CartMongoDB();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await prodDao.getAll();
        // log muestra los productos de mogo
        // console.log(products);

        // Convierte los objetos de monngo a objetos planos
        const productsPlain = products.map(product => Object.assign({}, product.toJSON()));

        res.render('partials/home', { products: productsPlain });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/product', (req, res) => {
    res.render('partials/realTimeProducts');
});

router.get('/contact', (req, res) => {
    res.render('partials/contact');
});

router.get('/cart', async (req, res) => {
    try {
        const products = await cartDao.getAll();
        // Convierte los objetos de monngo a objetos planos
        const productsPlain = products.map(product => Object.assign({}, product.toJSON()));

        res.render('partials/cart', { products: productsPlain });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});
export default router;

