import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import ZodProductSchema from "./product.zod.validation";

// post
const createProduct = async (payload: TProduct) => {
  const validatedData = ZodProductSchema.parse(payload);
  return await Product.create(validatedData);
};

// get
const getSingleProduct = async (id: string) => {
  return await Product.findById(id);
};


// get 
const searchProducts  = async (filter: any) => { 
    return await Product.find(filter);
};

// put
const updateSingleProduct = async (id: string,update:Partial<TProduct>) => { 
    const objectId = new mongoose.Types.ObjectId(id);
    return await Product.findOneAndUpdate({_id:objectId},update,{returnOriginal:false} );
};


// delete 
const deleteSingleProduct = async (id: string) => { 
    const objectId = new mongoose.Types.ObjectId(id);
    return await Product.deleteOne({_id:objectId} );
};









export const productServices = {
  createProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  searchProducts
};
