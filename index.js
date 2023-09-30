const express = require('express')
const path =    require('path')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(
    `mongodb+srv://carloslafont1997:${process.env.MONGO_DB_PASS}@development.9ueb0vg.mongodb.net/stock-app?retryWrites=true&w=majority`
)
.then((result) => {
    app.listen(PORT , () => {
        console.log('PORT: ', PORT)
    })
    console.log('Connected')
})
.catch((error) => console.log(error))

const productSchema = mongoose.Schema(
    {
        name:  { type: String, required: true, default: 'NA' },
        price: { type: Number, required: true },
    },
    { timestamps: true } 
)

const Product = mongoose.model('Product', productSchema)

app.use(express.json())

app.post('/api/v1/products', (req, res, next)=>{
    
    const newProduct = new Product(req.body)

    newProduct.save()
    .then(result =>{
        res.status(201).json({ ok : true })
    })
    .catch(err => console.log(err))
    
})
// app.get('/', function (req, res, next) { res.statis(200).sendFile('index.html', {root: __dirname}) console.log('Petición recibida')  next() })
app.use(express.static(path.join(__dirname, 'public')))

const PORT =  process.env.PORT