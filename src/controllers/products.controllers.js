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
<<<<<<< HEAD
    if (newProd) res.status(200).json(newProd);
    else res.status(404).json({ msg: "Error create product!" });
=======
    if (!newProd) res.status(404).json({ msg: "Error create product!" });
    else res.status(200).json(newProd);
>>>>>>> 6ef0c5d65932f7ee580a0e78c17f2942fd7f14d8
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
<<<<<<< HEAD
    const prodUpd = await service.updateProduct(req.body, id);
    if (prodUpd) res.status(200).json(prodUpd);
    else res.status(404).json({ msg: "Error update product!" });
=======
    const prodUpd = await service.updateProduct(id, req.body);
    if (!prodUpd) res.status(404).json({ msg: "Error update product!" });
    else res.status(200).json(prodUpd);
>>>>>>> 6ef0c5d65932f7ee580a0e78c17f2942fd7f14d8
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.deleteProduct(id);
<<<<<<< HEAD
    if (prodDel) res.status(200).json({ msg: `Product id: ${id} deleted` });
    else res.status(404).json({ msg: "Error delete product!" });
=======
    if (!prodDel) res.status(404).json({ msg: "Error delete product!" });
    else res.status(200).json({ msg: `Product id: ${id} deleted` });
>>>>>>> 6ef0c5d65932f7ee580a0e78c17f2942fd7f14d8
  } catch (error) {
    next(error.message);
  }
};