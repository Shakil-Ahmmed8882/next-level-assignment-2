import { z } from "zod";

// Define a Zod schema for the order data with meaningful error messages
const ZodOrderSchema = z.object({
  email: z.string().email("Invalid email address"),
  productId: z.string().nonempty("Product ID is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export default ZodOrderSchema;


