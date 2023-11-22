import { CartModel } from "../models/cart.models.js";
import { ProductModel } from "../models/products.models.js";


export default class CartMongoDB {
    async addToCart(id) {
        try {
            // Obtener el producto por su ID desde la colección de productos
            const product = await ProductModel.findById(id);
            if (!product) {
                throw new Error(`Product not found for ID: ${id}`);
            }

            // Agregar el producto al carrito
            const response = await CartModel.create({ product: product.id });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getCartItems() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async removeFromCart(cartItemId) {
        try {
            const response = await CartModel.findByIdAndDelete(cartItemId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
