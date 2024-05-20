import express from 'express'
import { productControllers } from './product.controller'
const router = express.Router()

router.get('/',productControllers.createProduct)



export const productRouter = router