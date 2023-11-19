import ProductMongoDB from "../daos/mongoseDb/products.mongose.js";
const prodDao = new ProductMongoDB();

export const getAll = async () => {
  try {
    return await prodDao.getAll();
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const prod = await prodDao.getById(id);
    if (!prod) return false;
    else return prod;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (obj) => {
  try {
    const newProd = await prodDao.createProduct(obj);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, obj) => {
  try {
    const prodUpd = await prodDao.updateProduct(id, obj);
    if (!prodUpd) return false;
    else return prodUpd;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const prodDel = await prodDao.deleteProduct(id);
    if (!prodDel) return false;
    else return prodDel;
  } catch (error) {
    console.log(error);
  }
};