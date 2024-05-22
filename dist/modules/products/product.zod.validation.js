"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Variant schema
const ZodVariantSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty("Variant type is required"),
    value: zod_1.z.string().nonempty("Variant value is required"),
});
// Define the Inventory schema
const ZodInventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().positive("Quantity must be a positive number"),
    inStock: zod_1.z.boolean(),
});
// Define the Product schema
const ZodProductSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Product name is required"),
    description: zod_1.z.string().nonempty("Product description is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    category: zod_1.z.string().nonempty("Category is required"),
    tags: zod_1.z.array(zod_1.z.string()).min(1, "At least one tag is required"),
    variants: zod_1.z.array(ZodVariantSchema).min(1, "At least one variant is required"),
    inventory: ZodInventorySchema,
});
exports.default = ZodProductSchema;
