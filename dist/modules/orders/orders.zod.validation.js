"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define a Zod schema for the order data with meaningful error messages
const ZodOrderSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    productId: zod_1.z.string().nonempty("Product ID is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
});
exports.default = ZodOrderSchema;
