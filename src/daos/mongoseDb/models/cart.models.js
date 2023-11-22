import { Schema, model } from "mongoose";

export const cartsCollection = "carts";

const cartSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

export const CartModel = model(
    cartsCollection,
    cartSchema
);