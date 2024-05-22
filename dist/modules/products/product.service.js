"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
const utils_1 = require("../../utils");
// post
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = product_zod_validation_1.default.parse(payload);
    const result = yield product_model_1.Product.create(validatedData);
    if (!result)
        throw Error('Opps!! Failed to add a product');
    return result;
});
// get
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(id);
});
// get 
const searchProducts = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find(filter);
    if (!result)
        throw Error('Failed to fetch data');
    return result;
});
// put
const updateSingleProduct = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    // is valid id
    utils_1.utils.validateObjectId(id);
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: objectId }, update, { returnOriginal: false });
    if (!result)
        throw Error('Failed to update');
    return result;
});
// delete 
const deleteSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    return yield product_model_1.Product.deleteOne({ _id: objectId });
});
exports.productServices = {
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    searchProducts
};
