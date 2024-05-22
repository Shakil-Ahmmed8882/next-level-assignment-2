"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: String,
    value: String
});
// Define the Inventory schema
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});
// Define the Product schema
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, index: 'text' },
    description: { type: String, required: true, index: 'text' },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
