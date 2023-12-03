import { Router } from "express";
import UserMongoDB from "../daos/mongoseDb/DB/user.mongose.js";
import ProductMongoDB from "../daos/mongoseDb/DB/products.mongose.js";
import CartMongoDB from "../daos/mongoseDb/DB/carts.mongose.js"
const prodDao = new ProductMongoDB();
const cartDao = new CartMongoDB();
const userDao = new UserMongoDB();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await prodDao.getAll();
        const products = result.payload.products;
        // console.log(products);
        res.render('partials/home', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/product', async (req, res) => {
    try {
        const result = await prodDao.getAll();
        const products = result.payload.products;
        // console.log(products);
        res.render('partials/home', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/contact', (req, res) => {
    res.render('partials/contact');
});

router.get('/cart', async (req, res) => {
    try {
        const products = await cartDao.getCart();
        const productsPlain = products.map(product => Object.assign({}, product.toJSON()));
        // console.log(productsPlain)
        res.render('partials/cart', { carts: productsPlain });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

//Login
router.get('/login', async (req, res) => {
    res.render('partials/login');
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userDao.login(email, password);

        if (userExist) {
            // Si el usuario existe, puedes iniciar sesión (por ejemplo, establecer una sesión)
            // Luego, redirigir al usuario a su perfil o a la página deseada
            res.redirect('/');
        } else {
            // Si las credenciales no son válidas, puedes renderizar la página de login con un mensaje de error
            res.render('partials/login', { errorMessage: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.render('partials/login', { errorMessage: 'Error during login' });
    }
});

router.get('/register', async (req, res) => {
    res.render('partials/register');
});

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const newUser = await userDao.register(user);

        if (newUser !== false && newUser !== null) {
            return res.redirect('/login?success=1');
        } else {
            return res.render('partials/register-error', { errorMessage: 'User already exists!' });
        }
    } catch (error) {
        console.error(error);
        return res.render('partials/register-error', { errorMessage: 'Error during registration.' });
    }
});


router.get('/profile', async (req, res) => {
    try {
        // Supongamos que ya has autenticado al usuario y tienes su información
        const userId = '...'; // Obtén el ID del usuario autenticado (puedes obtenerlo del objeto de solicitud o de la sesión)
        
        // Realiza la consulta a MongoDB para obtener los detalles del usuario
        const user = await userDao.findById(userId);

        if (!user) {
            // Maneja el caso en el que no se encuentre el usuario
            return res.status(404).render('partials/profile', { errorMessage: 'User not found' });
        }

        res.render('partials/profile', { user });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/register-error', async (req, res) => {
    res.render('partials/register-error');
});

export default router;

