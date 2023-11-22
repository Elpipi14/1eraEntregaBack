// model.cart.js
import { Schema, model } from "mongoose";

export const cartsCollection = "carts";

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    title: { type: String, required: true },  // Hacer que el título no sea obligatorio
    price: { type: Number, required: true },  // Hacer que el precio no sea obligatorio
});

export const CartModel = model(cartsCollection, cartSchema);