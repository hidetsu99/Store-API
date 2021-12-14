require('dotenv').config()
const { json } = require('express')
const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const connectDB = require('./db/connect')
///middleware
app.use(express.json())


app.get('/', (req, res)=>{
  res.send('In home <br> <a href="/api/v1/hotel"> api v1 </P>')
})
app.use('/api/v1/products',)
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.port || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server listening at port ${port}`) )
  } catch (error) {
    console.log(error);
  }
}
start()
console.log('04 Store API')
