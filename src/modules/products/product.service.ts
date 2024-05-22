import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import ZodProductSchema from "./product.zod.validation";
import { utils } from "../../utils";

// post
const createProduct = async (payload: TProduct) => {
  const validatedData = ZodProductSchema.parse(payload);
  const result = await Product.create(validatedData);

  if (!result) throw Error("Opps!! Failed to add a product");

  return result;
};

// get
const getSingleProduct = async (id: string) => {
  utils.validateObjectId(id);
  const result = await Product.findById(id);
  if (!result) throw Error("No product found");
  return result;
};

// get
const searchProducts = async (filter: any) => {
  const result = await Product.find(filter);
  if (result.length === 0) throw Error("Opps!!! No data found.");
  return result;
};

// put
const updateSingleProduct = async (id: string, update: Partial<TProduct>) => {
  // is valid id
  utils.validateObjectId(id);
  const objectId = new mongoose.Types.ObjectId(id);

  const result = await Product.findOneAndUpdate({ _id: objectId }, update, {
    returnOriginal: false,
  });
  // Check if the update was successful

  if(result === null) throw new Error('Opps! order was not updated')

  if (result && update.name && result.name !== update.name) {
    throw new Error("Failed to update the product name");
  }

  return result;
};

// delete
const deleteSingleProduct = async (id: string) => {
  utils.validateObjectId(id);

  const objectId = new mongoose.Types.ObjectId(id);
  return await Product.deleteOne({ _id: objectId });
};

export const productServices = {
  createProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  searchProducts,
};
