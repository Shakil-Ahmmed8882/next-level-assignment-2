import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import ZodProductSchema from "./product.zod.validation";

const createProduct = async (payload: TProduct) => {
  const validatedData = ZodProductSchema.parse(payload);
  return await Product.create(validatedData);
};

const getAllProducts = async () => {
  return await Product.find();
};

const getSingleProduct = async (id: string) => {
  return await Product.findById(id);
};
// Convert the id string to an ObjectId
const updateSingleProduct = async (id: string) => {
    const objectId = new mongoose.Types.ObjectId(id);
    const update = {name:'Brand new apple🍎🍎'}
    return await Product.findOneAndUpdate({_id:objectId},update,{returnOriginal:false} );
};

export const productServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
};
