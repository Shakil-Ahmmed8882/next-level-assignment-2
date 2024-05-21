import { z } from "zod"; 

// Define the Variant schema
const ZodVariantSchema = z.object({
  type: z.string().nonempty("Variant type is required"),
  value: z.string().nonempty("Variant value is required"),
});

// Define the Inventory schema
const ZodInventorySchema = z.object({
  quantity: z.number().positive("Quantity must be a positive number"),
  inStock: z.boolean(),
});

// Define the Product schema
const ZodProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().nonempty("Product description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().nonempty("Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  variants: z.array(ZodVariantSchema).min(1, "At least one variant is required"),
  inventory: ZodInventorySchema,
});

export default ZodProductSchema;