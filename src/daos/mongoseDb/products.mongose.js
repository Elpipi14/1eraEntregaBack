import { ProductModel } from "./models/products.models.js";

export default class ProductMongoDB {
  async getAll() {
    try {
      const response = await ProductModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
<<<<<<< HEAD
      const response = await ProductModel.findByIdAndUpdate(obj, id, {
=======
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
>>>>>>> 6ef0c5d65932f7ee580a0e78c17f2942fd7f14d8
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}


