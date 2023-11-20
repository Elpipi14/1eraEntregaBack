import * as service from "../service/product.service.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) res.status(404).json({ msg: "Product Not found!" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProd = await service.createProduct(req.body);
    if (newProd) res.status(200).json(newProd);
    else res.status(404).json({ msg: "Error create product!" });
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.updateProduct(req.body, id);
    if (prodUpd) res.status(200).json(prodUpd);
    else res.status(404).json({ msg: "Error update product!" });
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.deleteProduct(id);
    if (prodDel) res.status(200).json({ msg: `Product id: ${id} deleted` });
    else res.status(404).json({ msg: "Error delete product!" });
  } catch (error) {
    next(error.message);
  }
};