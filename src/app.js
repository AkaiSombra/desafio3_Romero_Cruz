
import fs from 'fs'
import express from 'express'

const PORT = 8080
const productManagerPath = "../ProductManager.json"

const productManagerTransform = () =>{
    try {
      const dataJSON = fs.readFileSync(productManagerPath, 'utf8')
      const productManagerJson = JSON.parse(dataJSON)
      return productManagerJson
    } catch (error) {
      console.error(error.message)
    }
}

const productManager = productManagerTransform()


const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/products', (req, res) => {
    const limit = req.query.limit

    if (limit){
        res.send(productManager[limit])
    } else {
        res.send(productManager)
    }
})

app.get('/products/:pid', (req, res) => {
    res.send(productManager[req.params.pid])
})

app.listen(PORT, () => {
    console.log(`Express server from port ${PORT}`)
})
