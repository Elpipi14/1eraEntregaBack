// model.cart.js
import { Schema, model } from "mongoose";

export const cartsCollection = "carts";

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    title: { type: String, required: true }, 
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },  
});

export const CartModel = model(cartsCollection, cartSchema);