import fs from "fs";


export class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    async createProduct(obj) {
        try {
            const product = {
                id: (await this.#getMaxId()) + 1, ...obj,
                status: true,
                ...obj
            };
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
    };

    async #getMaxId() {
        let maxId = 0;
        const products = await this.getProducts();
        products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === id)
            if (!product) return false;
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(updatedProduct, id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if (index === -1) return false;
            for (const prop in updatedProduct) {
                if (updatedProduct.hasOwnProperty(prop)) {
                    products[index][prop] = updatedProduct[prop];
                }
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            if (products.length < 0) return false;
            const newArray = products.filter(product => product.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
        } catch (error) {
            console.log(error);
        }
    }
};