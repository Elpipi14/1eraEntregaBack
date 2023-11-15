import { Router } from "express";
import { getProducts } from "../manager/productsManager.js"; 
const router = Router();

router.get('/', (req, res) => {
    const products = getProducts();
    res.render('partials/home', { products });
});

router.get('/realTimeProducts', (req, res) => {
    res.render('partials/realTimeProducts');
});

router.get('/contact', (req, res) => {
    res.render('partials/contact');
});

export default router;

