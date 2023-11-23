import fs from "fs";

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(cartsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    async getProducts() {
        try {
            const productsJSON = await fs.promises.readFile("./src/daos/fileSystem/data/products.json", 'utf-8');
            return JSON.parse(productsJSON);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async addToCart(productId) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id == productId);

            if (!product) {
                console.log(`Producto con ID ${productId} no encontrado.`);
                return false;
            }

            const carts = await this.getAll();
            let cart = carts.find(c => c.products && c.products.some(p => p.product == productId));

            if (!cart) {
                const newCartId = (await this.getById()) + 1;
                cart = { id: newCartId, products: [] };
                carts.push(cart);
            }

            const existingProduct = cart.products.find(p => p.product == productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const newProduct = {
                    product: productId,
                    quantity: 1,
                    title: product.title,
                    price: product.price
                };
                cart.products.push(newProduct);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getById() {
        let maxId = 0;
        const carts = await this.getAll();
        carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;
        });
        return maxId;
    }

    async getCartItems(cid) {
        try {
            const carts = await this.getAll();
            const cart = carts.find(cart => cart.id === String(cid));
            if (!cart) return false;
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const carts = await this.getAll();
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
            const carts = await this.getAll();
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