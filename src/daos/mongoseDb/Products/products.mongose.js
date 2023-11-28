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
      console.log('Iniciando operación de agregación...');

      const result = await ProductModel.aggregate([
        {
          $match: { category: '2024' }
        },
      ]);

      console.log('Operación de agregación completada. Resultados:', result);

      if (result.length === 0) {
        console.log('No se encontraron productos en la categoría especificada.');
        return { msg: 'No se encontraron productos en la categoría especificada.' };
      }

      return result;
    } catch (error) {
      console.error('Error en la operación de agregación:', error);
      return null;
    }
  }


}
