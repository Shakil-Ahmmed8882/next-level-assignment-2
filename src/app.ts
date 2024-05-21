
import express, { Request, Response } from 'express'
const app = express()
import cors from 'cors'
import { productRouter } from './modules/products/product.route'
// parser 
app.use(express.json())
app.use(cors())


// router
app.use('/api/products',productRouter)



app.get('/', (req:Request, res:Response) => {
  res.send('Hello World! is transformed')
})

export default app