import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.render('partials/home')
});

router.get('/realTimeProducts', (req, res) => {
    res.render('partials/realTimeProducts');
});

export default router;

