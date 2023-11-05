import fs from "fs";

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(cartsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    async createCart(obj) {
        try {
            const cart = { id: (await this.#getMaxId()) + 1, ...obj };
            const carts = await this.getCarts();
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            console.log(error);
        }
    };

    async #getMaxId() {
        let maxId = 0;
        const carts = await this.getCarts();
        carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;
        });
        return maxId;
    }

    async getCartById(cid) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === String(cid));
            if (!cart) return false;
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {
            const carts = await this.getCarts();
            if (carts.length === 0) return false;
            const newArrayCart = carts.filter(cart => cart.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayCart));
            console.log(`Cart with id ${id} deleted successfully.`);
            return true;
        } catch (error) {
            console.error(`Error deleting cart with id ${id}: ${error}`);
            return false;
        }
    }

    async saveProductToCart(idCart, idProd, product) {
        try {
            const carts = await this.getCarts();
            let cartExists = await this.getCartById(idCart);
            console.log("Cart Exists:", cartExists);

            if (!cartExists) {
                cartExists = await this.createCart({ id: idCart, products: [] });
            }
            const existingProduct = cartExists.products.find(p => p.product === idProd);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const newProduct = {
                    product: idProd,
                    quantity: 1,
                    title: product.title,
                    price: product.price
                };
                cartExists.products.push(newProduct);
            }

            const cartIndex = carts.findIndex(c => c.id === idCart);
            if (cartIndex !== -1) {
                carts[cartIndex] = cartExists;
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
            }

            return cartExists;
        } catch (error) {
            console.error("Error en saveProductToCart:", error);
        }
    }

}