
import fs from 'fs'
import { json } from 'stream/consumers'


class ProductManager{
    static products = []
    static id = 0

    constructor(title, description, price, thumbnail, code, stock, path){
        this.id = ProductManager.id++
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.path = path
    }

    static addProduct(title, description, price, thumbnail, code, stock, path) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
          console.log("Todos los campos son obligatorios.")
          return
        }
    
        const existingProduct = ProductManager.products.find((ProductManager) => ProductManager.code === code)
        if (existingProduct) {
          console.log(`El producto con el código ${code} ya existe.`)
          return
        }
    
        const newProduct = new ProductManager(title, description, price, thumbnail, code, stock, path)
        ProductManager.products.push(newProduct)
        console.log(`Producto agregado con ID: ${newProduct.id}`)
      }

      static getProducts() {
        return ProductManager.products
      }

      static getProductById(id) {
        const product = ProductManager.products.find((ProductManager) => ProductManager.id === id)
        if (product) {
          return product
        } else {
          console.error("Producto no encontrado. ID no válido.")
        }
    }

    static updateProduct(id, updatedProduct) {
      const productIndex = ProductManager.products.findIndex((product) => product.id === id)
      if (productIndex === -1) {
        console.error("Producto no encontrado. ID no válido.")
        return;
      }

      updatedProduct.id = id

      ProductManager.products[productIndex] = updatedProduct
    }

    static deleteProduct(id) {
      const productIndex = ProductManager.products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        console.error("Producto no encontrado. ID no válido.");
        return;
      }
  
      ProductManager.products.splice(productIndex, 1);
      console.log(`Producto con ID ${id} ha sido eliminado.`);
    }

    static saveProductsToJSON(filePath) {
      try {
        const dataToWrite = JSON.stringify(ProductManager.products, null, 2)
        fs.writeFileSync(filePath, dataToWrite, 'utf-8')
      } catch (error) {
        console.error(error.message)
      }
    }

    static loadProductsFromJSON(filePath) {
      try {
        const dataJSON = fs.readFileSync(filePath, 'utf8')
        ProductManager.products = JSON.parse(dataJSON)
      } catch (error) {
        console.error(error.message)
      }
    }    
  }

ProductManager.addProduct("Lies of P", "A Souls-like videogame", 40, "LiesofP.jpg", 2873, true, '/products/img/LiesOfP.jpg')
ProductManager.addProduct("Sekiro: Shadow Die Twice", "Souls-like game with katanas", 60, "Sekiro.jpg", 2875, true, '/products/img/Sekiro.jpg')
ProductManager.addProduct("Shadow of doubt", "A Detective sandbox game", 15, "ShadowOfDobut.jpg", 1168, true, '/products/img/ShadowOfDobut.jpg')
ProductManager.addProduct("Neon White", "A Parkour game", 20, "NeonWhite.jpg", 1268, true, '/products/img/NeonWhite.jpg')

const allProducts = ProductManager.getProducts()
console.log(allProducts)

//console.log(ProductManager.products)

const productById = ProductManager.getProductById(2)
console.log(productById)

// const nonExistentProduct = ProductManager.getProductById(10)



ProductManager.updateProduct(2, {
  title: "Elden Ring",
  description: "Lastest game of From Software",
  price: 60,
  thumbnail: "eldenring.jpg",
  code: "2875",
  stock: true,
  path: '/products/img/EldenRing.jpg'
});

console.log(allProducts)

console.log(ProductManager.getProductById(2))

ProductManager.deleteProduct(4)

console.log(ProductManager.getProducts())

const JSONPath = './ProductManager.json'

ProductManager.saveProductsToJSON(JSONPath)

ProductManager.loadProductsFromJSON(JSONPath)
