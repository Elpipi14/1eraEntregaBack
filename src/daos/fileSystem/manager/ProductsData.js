import fs from 'fs';

// logica implementada para products real Time....para agregar productos al json en carpeta data y eliminarlo.
const productFilePath = './src/daos/fileSystem/data/products.json';

export const addProduct = (product) => {
    const products = getProducts();
    products.push(product);
    saveProducts(products);
};

export const deleteProduct = (productId) => {
    const products = getProducts().filter(product => product.id !== productId);
    saveProducts(products);
};

export const getProducts = () => {
    try {
        const data = fs.readFileSync(productFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer el archivo de productos:', err);
        return [];
    }
};

const saveProducts = (products) => {
    fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2), 'utf8');
};