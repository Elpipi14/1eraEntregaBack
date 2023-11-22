import * as cartService from "../service/cart.service.js";

export const addToCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cartItem = await cartService.addToCart(productId);

        if (cartItem) res.status(200).json(cartItem);
        else res.status(404).json({ msg: "Error adding to cart!" });
    } catch (error) {
        next(error.message);
    }
};

export const getCartItems = async (req, res, next) => {
    try {
        const cartItems = await cartService.getCartItems();
        res.status(200).json(cartItems);
    } catch (error) {
        next(error.message);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const response = await cartService.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { cartItemId, productId } = req.params;
        const removedItem = await cartService.deleteProduct(cartItemId, productId);
        if (removedItem) res.status(200).json({ msg: "Product removed from cart" });
        else res.status(404).json({ msg: "Error removing from cart!" });
    } catch (error) {
        next(error.message);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const response = await cartService.clearCart();
        if (response) res.status(200).json({ msg: "Cart cleared" });
        else res.status(404).json({ msg: "Error clearing cart!" });
    } catch (error) {
        next(error.message);
    }
};
