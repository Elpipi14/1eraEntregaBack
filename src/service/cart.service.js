
// import CartMongoDB from "../daos/mongoseDb/Products/carts.mongose.js";
// const cartDao = new CartMongoDB();

import { CartManager } from "../daos/fileSystem/manager/cartManager.js";
import { __dirname } from "../utils.js"
const cartDao = new CartManager(__dirname + '/daos/fileSystem/data/carts.json');

export const addToCart = async (productId) => {
    try {
        const cartItem = await cartDao.addToCart(productId);
        if (cartItem) return cartItem;
        else return false;
    } catch (error) {
        console.log(error);
    }
};

export const getAll = async () => {
    try {
        return await cartDao.getAll();
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

export const deleteProduct = async (cartItemId) => {
    try {
        const removedItem = await cartDao.deleteProduct(cartItemId);
        if (removedItem) return removedItem;
        else return false;
    } catch (error) {
        console.log(error);
    }
};

export const clearCart = async (cartItemId) => {
    try {
        const removedItem = await cartDao.clearCart(cartItemId);
        if (removedItem) return removedItem;
        else return false;
    } catch (error) {
        console.log(error);
    }
};
