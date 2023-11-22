import { Router } from "express";
const router = Router();

import { CartManager } from "./src/daos/fileSystem/manager/cartManager.js";
const cartsManager = new CartManager('./src/daos/fileSystem/data/carts.json');

import { ProductManager } from "./src/daos/fileSystem/manager/productsManager.js";
const productsManager = new ProductManager('./src/daos/fileSystem/data/products.json');

let lastCartId = 0;

router.post('/', async (req, res) => {
    try {

        lastCartId += 1;
        const newCart = {
            id: lastCartId.toString(),
            products: [],
        };

        await cartsManager.createCart(newCart);

        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear un carrito', error: error.message });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const product = await productsManager.getProductById(Number(pid));
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        let cart = await cartsManager.getCartById(cid);

        if (!cart) {
            cart = await cartsManager.createCart({ id: cid, products: [] });
        }
        const updatedCart = await cartsManager.saveProductToCart(cid, pid, product);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartById(Number(cid));
        console.log(cart);
        if (!cart) res.status(404).json({ message: 'cart not found' });
        else res.status(200).json(cart);
        return cart;
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const idNumber = Number(cid);
        await cartsManager.deleteCart(idNumber);
        res.json({ message: `cart id: ${idNumber} deleted` });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;