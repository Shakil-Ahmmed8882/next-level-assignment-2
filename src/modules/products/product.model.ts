import  { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema  = new Schema<TVariant>({
    type:String,
    value:String
})


// Define the Inventory schema
const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  });
  

// Define the Product schema
const productSchema = new Schema<TProduct>({
    name: { type: String, required: true,index:'text' },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true },
  });


  export const Product = model<TProduct>('Product',productSchema)