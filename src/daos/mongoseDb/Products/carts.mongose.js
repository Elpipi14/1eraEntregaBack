// carrito.mongo.js
import { CartModel } from "../models/cart.models.js";
import { ProductModel } from "../models/products.models.js";

export default class CartMongoDB {
    async addToCart(productId) {
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error(`Product not found for ID: ${productId}`);
            }

            // Verificar si el producto ya está en el carrito
            const existingCartItem = await CartModel.findOne({ product: product.id });
            if (existingCartItem) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                existingCartItem.quantity += 1;
                await existingCartItem.save();
                return existingCartItem;
            }

            // Si el producto no está en el carrito, agregarlo con cantidad 1 y detalles adicionales
            const newCartItem = new CartModel({
                product: product.id,
                quantity: 1,
                title: product.title,
                price: product.price,
            });

            await newCartItem.save();
            return newCartItem;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(cartItemId) {
        try {
            const response = await CartModel.findByIdAndDelete(cartItemId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async clearCart() {
        try {
            const response = await CartModel.deleteMany({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
