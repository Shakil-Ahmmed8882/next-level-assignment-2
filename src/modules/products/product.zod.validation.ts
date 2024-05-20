import { z } from "zod"; 

// Define the Variant schema
const ZodVariantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define the Inventory schema
const ZodInventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Define the Product schema
const ZodProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(ZodVariantSchema),
  inventory: ZodInventorySchema,
});

export default ZodProductSchema