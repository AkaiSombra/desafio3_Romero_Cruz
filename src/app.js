
import fs from 'fs'
import express from 'express'
import { error } from 'console'
import { type } from 'os'

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
        const parsedLimit = parseInt(limit)
        const limitedProducts = productManager.slice(0, parsedLimit)
        res.send(limitedProducts)
    } else {
        res.send(productManager)
    }
})

app.get('/products/:pid', (req, res) => {
    let pid = parseInt(req.params.pid)
    
    const searchById = (pid) => {
        const productById = productManager.find(productManager => productManager.id === pid)
        return productById || `Error, product with id ${pid} not exist`
    }

    searchById(pid)
     if(searchById){
        res.send(searchById(pid)) 
    } else {
        res.send()
    } 

})

app.listen(PORT, () => {
    console.log(`Express server from port ${PORT}`)
})
