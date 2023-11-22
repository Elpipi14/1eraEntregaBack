// import { ProductManager } from "../daos/fileSystem/manager/productsManager.js";
// import { __dirname } from "../utils.js"
// const prodDao = new ProductManager(__dirname + '/daos/fileSystem/data/products.json');

import CartMongoDB from "../daos/mongoseDb/Products/carts.mongose.js";
const cartDao = new CartMongoDB();

export const addToCart = async (productId) => {
    try {
        const cartItem = await cartDao.addToCart(productId);
        if (cartItem) return cartItem;
        else return false;
    } catch (error) {
        console.log(error);
    }
};

export const getCartItems = async () => {
    try {
        return await cartDao.getCartItems();
    } catch (error) {
        console.log(error);
    }
};

export const removeFromCart = async (cartItemId) => {
    try {
        const removedItem = await cartDao.removeFromCart(cartItemId);
        if (removedItem) return removedItem;
        else return false;
    } catch (error) {
        console.log(error);
    }
};
