import { z } from "zod";

// Define a Zod schema for the order data
const ZodOrderSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export default ZodOrderSchema;
