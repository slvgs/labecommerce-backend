import { createProduct, getAllUsers, gettAllProducts, getProductById, queryProductsByName, Users, Product, Purchase  } from "./database";
import express, { Request, Response} from "express"
import cors from "cors"
import { TCliente, TProduct, TPurchase } from "./type";



const app = express()

app.use(express.json())
app.use(cors())



app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//----------------------------------------------------------------------------------------

//                   USERS 
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(Users)
})

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

app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
     
    const indexRemove = Users.findIndex((users) => users.id === id)

    if (indexRemove >= 0){
        Users.splice(indexRemove, 1)
    }


    res.status(200).send("Usuário removido com sucesso!")


  
    
})

app.put("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id 

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const usersToEdit = Users.find((users) => users.id === id)



    if(usersToEdit){
        usersToEdit.id = newId || usersToEdit.id
        usersToEdit.email = newEmail || usersToEdit.email
        usersToEdit.password = newPassword || usersToEdit.password
    }


    res.status(200).send("Atualização realizada com sucesso.")
})

// --------------------------------------------------------------------------------------

//                     PRODUCTS


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


app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexRemove = Product.findIndex((pro) => pro.id === id)

    if(indexRemove >= 0){
        Product.splice(indexRemove, 1)
    }

    res.status(200).send("Produto removido com sucesso!")
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

app.get("/products/searchId", (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = Product.filter((pro) => {
        return pro.id.toLocaleLowerCase().includes(q)
    })

    res.status(200).send(result)
})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as string | undefined

    const productToEdit = Product.find((prod) => prod.id === id)

    if(productToEdit){
        productToEdit.id = newId || productToEdit.id
        productToEdit.name = newName || productToEdit.name
        productToEdit.category = newCategory || productToEdit.category


        productToEdit.price = isNaN(newPrice) ? productToEdit.price: newPrice
        // productToEdit.price = isNan(newPrice) ? productToEdit.price : newPrice
    }

    res.status(200).send("Produto editado com sucesso!")

})


//--------------------------------------------------------------------------------------

//                         PURCHASE

app.get("/purchase", (req: Request, res: Response) => [
    res.status(200).send(Purchase)
])


app.get("/purchase/search", (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = Purchase.filter((purchases) => {
        return purchases.userId.toLocaleLowerCase().includes(q)
    })

    res.status(200).send(result)
})



app.post("/purchase", (res: Response, req: Request) => {
    // const {userId, productId, quantity, totalPrice} = req.body as TPurchase

    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId : userId,
        productId : productId,
        quantity: quantity,
        totalPrice: totalPrice
    }

    Purchase.push(newPurchase)
    
    res.status(201).send("Nova compra registrada com sucesso!")
})


