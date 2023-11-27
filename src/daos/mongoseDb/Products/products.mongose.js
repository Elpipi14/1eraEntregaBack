import { ProductModel } from "../models/products.models.js";

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
      return null
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
      const response = await ProductModel.findByIdAndUpdate(obj, id, { new: true, });
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

  async aggregation1() {
    try {
      return await ProductModel.aggregate([
        {
          $match: { category: '2023' }
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  
}
