let products = [];

export const addProduct = (product) => {
    products.push(product);
};

export const deleteProduct = (productId) => {
  products = products.filter(product => product.id !== productId);
};

export const getProducts = () => {
    return products;
};
