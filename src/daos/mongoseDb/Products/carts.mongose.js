// carrito.mongo.js
import { CartModel } from "../models/cart.models.js";
import { ProductModel } from "../models/products.models.js";

export default class CartMongoDB {

    async createCart() {
        try {
            const newCart = new CartModel({
                products: [],
            });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addToCart(cartId, productId) {
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error(`Product not found for ID: ${productId}`);
            }

            let cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error(`Cart not found for ID: ${cartId}`);
            }

            // Verifica si 'products' es undefined y, si lo es, inicializa el array
            if (!cart.products) {
                cart.products = [];
            }

            // Busca si el producto ya está en el carrito
            const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, aumenta la cantidad
                cart.products[existingProductIndex].quantity += 1;
            } else {
                // Si el producto no está en el carrito, agrégalo
                cart.products.push({
                    quantity: 1,
                    title: product.title,
                    price: product.price,
                    imageUrl: product.imageUrl,
                });
            }

            // Guarda el carrito actualizado
            cart = await cart.save();

            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCart() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error(`Cart not found for ID: ${cartId}`);
            }

            // Filtra los productos, excluyendo el que tiene la ID dada
            cart.products = cart.products.filter(item => item._id.toString() !== productId);

            // Guarda el carrito actualizado
            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await CartModel.findByIdAndDelete(cartId);
            return deletedCart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async clearCart() {
        try {
            const response = await CartModel.deleteMany({});
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
