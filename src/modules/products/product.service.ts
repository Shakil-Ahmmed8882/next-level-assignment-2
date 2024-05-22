import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import ZodProductSchema from "./product.zod.validation";
import { utils } from "../../utils";


// post
const createProduct = async (payload: TProduct) => {
  const validatedData = ZodProductSchema.parse(payload);
  const result =  await Product.create(validatedData);

  if(!result) throw Error('Opps!! Failed to add a product')

  return result
};

// get
const getSingleProduct = async (id: string) => {
  return await Product.findById(id);
};


// get 
const searchProducts  = async (filter: any) => { 
    const result =  await Product.find(filter);
    if(!result) throw Error('Failed to fetch data')
    return result
};

// put
const updateSingleProduct = async (id: string,update:Partial<TProduct>) => { 

  // is valid id
  utils.validateObjectId(id)
    const objectId = new mongoose.Types.ObjectId(id);

    const result =  await Product.findOneAndUpdate({_id:objectId},update,{returnOriginal:false} );
    if(!result) throw Error('Failed to update')
    return result
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
