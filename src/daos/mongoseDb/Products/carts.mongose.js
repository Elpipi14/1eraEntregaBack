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

            if (!cart.products) {
                cart.products = [];
            }

            const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({
                    quantity: 1,
                    title: product.title,
                    price: product.price,
                    imageUrl: product.imageUrl,
                });
            }

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

            cart.products = cart.products.filter(item => item._id.toString() !== productId);

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

    async updateProductQuantity(cartId, productId, newQuantity) {
        try {
          const updatedCart = await CartModel.findOneAndUpdate(
            { _id: cartId, 'products.product': productId },
            { $set: { 'products.$.quantity': newQuantity } },
            { new: true }
          );
      
          if (!updatedCart) {
            throw new Error(`Cart or product not found for IDs: ${cartId}, ${productId}`);
          }
      
          return updatedCart;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

}
