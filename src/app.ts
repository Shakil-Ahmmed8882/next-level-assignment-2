
import express, { Request, Response} from 'express'
const app = express()
import cors from 'cors'
import { productRouter } from './modules/products/product.route'
import { orderRouter } from './modules/orders/orders.route'
import { utils } from './utils'
// parser 
app.use(express.json())
app.use(cors())



app.use(utils.RouteNotFoundError)

// routers
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)

// middleware 
app.use(utils.errorHandler)



app.get('/', (req:Request, res:Response) => {
  res.send('Hello World! is transformed')
})

export default app