"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const product_route_1 = require("./modules/products/product.route");
const orders_route_1 = require("./modules/orders/orders.route");
const utils_1 = require("./utils");
// parser 
app.use(express_1.default.json());
// routers
app.use('/api/products', product_route_1.productRouter);
app.use('/api/orders', orders_route_1.orderRouter);
app.get('/', (req, res) => {
    res.send('Hello World! 🙋‍♀️🙋‍♀️');
});
// Route Not Found Middleware (404 handler)
app.use(utils_1.utils.RouteNotFoundError);
// Error Handling Middleware
app.use(utils_1.utils.errorHandler);
exports.default = app;
