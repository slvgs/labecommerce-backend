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


    try {

        const id = req.body.id;
        const email = req.body.email
        const password = req.body.password
        
        

 

        const findId = Users.find((usuario) => usuario.id === id)
        const findEmail = Users.find((em) => em.email === email)
        
        if(findId){
            res.status(400)
            throw new Error("Id Indisponivel")
        }
    
        if(findEmail){
            res.status(400)
            throw new Error("Email indisponivel")

        }


        const newClient: TCliente = {
            id,
            email,
            password
        }
    
        Users.push(newClient)


            
    
        res.status(201).send("Cliente registadro com sucesso.")
    
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)

        
    }


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


app.get('/products/searchName', (req:Request, res: Response) => {

    try {

        const q = req.query.q as string

        
        if(q.length < 1){
            return res.status(400).send("Deve haver ao menos 1 caractere")

        

        }



        const result = Product.filter((pro) => {
            return pro.name.toLocaleLowerCase().includes(q)
        }) 
    
        res.status(200).send(result)


       

        
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.send(500)
        }
        res.send(error.message)

       

        

        
    }




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


    try {

        const {id, name, price, category } = req.body as TProduct

        const findId = Product.find((prod) => prod.id === id)

        if(findId){
            res.status(400)
            throw new Error("ID de produto Indisponivel! ")
        }

        const newProduct: TProduct = {
            id,
             name,
              price,
               category
        }
    
        Product.push(newProduct)
    
        res.status(201).send('Produto Cadastrado com sucesso')
    
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)


        
    }
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

app.get("/purchases", (req: Request, res: Response) => [
    res.status(200).send(Purchase)
])


app.get("/purchases/search", (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = Purchase.filter((purchases) => {
        return purchases.userId.toLocaleLowerCase().includes(q)
    })

    res.status(200).send(result)
})



app.post("/purchases", ( req: Request, res: Response) => {
    // const {userId, productId, quantity, totalPrice} = req.body as TPurchase


    try {

        const userId = req.body.userId
        const productId = req.body.productId
        const quantity = req.body.quantity
        const price = req.body.price
        const totalPrice = req.body.totalPrice
    
    
        const findId = Purchase.find((purchase) => purchase.productId === productId)
        const findUser = Purchase.find((purchase) => purchase.userId === userId)
        
    
        if(!findUser){
            res.status(400)
            throw new Error("Esse ID não foi encontrado")
        }
    
        if(!findId){
            res.status(400)
            throw new Error("Esse ID não foi encontrado")
        }
    
        if(findId.price * quantity !== totalPrice){
            res.status(400)
            throw new Error("Valor errado")
        }
    
        
    
        const newPurchase: TPurchase = {
            userId,
            productId,
            quantity,
            price,
            totalPrice
        }
    
        Purchase.push(newPurchase)
        
        res.status(201).send("Nova compra registrada com sucesso!")
        
    } catch (error: any) {

        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
       res.send(error.message)


        
    }
})


