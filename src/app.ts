
import express, { Request, Response} from 'express'
const app = express()
import { productRouter } from './modules/products/product.route'
import { orderRouter } from './modules/orders/orders.route'
import { utils } from './utils'
// parser 
app.use(express.json())




// routers
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)



app.get('/', (req:Request, res:Response) => {
  res.send('Hello World! 🙋‍♀️🙋‍♀️')
})

// Route Not Found Middleware (404 handler)
app.use(utils.RouteNotFoundError);

// Error Handling Middleware
app.use(utils.errorHandler);

export default app