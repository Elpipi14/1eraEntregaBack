import * as cartService from "../service/cart.service.js";

export const addToCart = async (req, res, next) => {
    try {
        const { productId } = req.params; // Cambia de req.body a req.params

        console.log("Product ID:", productId);

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

export const removeFromCart = async (req, res, next) => {
    try {
        const { cartItemId } = req.params;
        const removedItem = await cartService.removeFromCart(cartItemId);
        if (removedItem) res.status(200).json({ msg: "Item removed from cart" });
        else res.status(404).json({ msg: "Error removing from cart!" });
    } catch (error) {
        next(error.message);
    }
};
