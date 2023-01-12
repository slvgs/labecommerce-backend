import { createProduct, getAllUsers, gettAllProducts, getProductById, queryProductsByName, Users, Product, Purchase  } from "./database";
import express, { Request, response, Response} from "express"
import cors from "cors"
import { TCliente, TProduct, TPurchase } from "./type";



const app = express()

app.use(express.json())
app.use(cors())



app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) =>{
    res.send('Pong!')
})


app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(Users)
})


app.get('/products', (req:Request, res: Response) => {
    res.status(200).send(Product)
})


app.get('/products/search', (req:Request, res: Response) => {
    const q = req.query.q as string
    const result = Product.filter((pro) => {
        return pro.name.toLocaleLowerCase().includes(q)
    }) 

    res.status(200).send(result)
})

app.get("/purchase", (req: Request, res: Response) => [
    res.status(200).send(Purchase)
])

app.post("/users", (req: Request, res: Response)=> {
    const {id, email, password} = req.body as TCliente

    const newClient = {
        id,
        email,
        password
    }

    Users.push(newClient)


    res.status(201).send("Cliente registadro com sucesso.")
})

app.post("/products", (req: Request, res: Response) => {
    const {id, name, price, category } = req.body as TProduct

    const newProduct = {
        id,
         name,
          price,
           category
    }

    Product.push(newProduct)

    res.status(201).send('Produto Cadastrado com sucesso')
})

app.post("/purchase", (res: Response, req: Request) => {
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    Purchase.push(newPurchase)
    
    res.status(201).send("Nova compra registrada com sucesso!")
})


