import { createProduct, getAllUsers, gettAllProducts, getProductById, queryProductsByName, Users, Product, Purchase  } from "./database";
import express, { Request, Response} from "express"
import cors from "cors"
import { TCliente, TProduct, TPurchase } from "./type";
import { db } from "./database/knex";



const app = express()

app.use(express.json())
app.use(cors())



app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})





//----------------------------------------------------------------------------------------

//                   USERS 
app.get('/users', async (req: Request, res: Response) => {
 
    const result = await db.select("*").from("users")
    res.status(200).send(result)
})




app.post("/users", async (req: Request, res: Response)=> {


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
            id: id,
            email: email,
            password: password
        }
    
        await db("users").insert(newClient)


            
    
        res.status(200).send({message: "Cliente registadro com sucesso."})
    
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)

        
    }


})




app.delete('/users/:id',async (req: Request, res: Response) => {

    try {
        const idToDelete = req.params.id
        
        const [user] = await db("users").where({id: idToDelete})

        if (!user) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send({message:"Usuário removido com sucesso!"})
    


    } catch (error: any) {

        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        
    }
   
     
    // const indexRemove = Users.findIndex((users) => users.id === id)

    // if (indexRemove >= 0){
    //     Users.splice(indexRemove, 1)
    // }





  
    
})

app.put("/users/:id", async (req: Request, res: Response) => {

    try {


        const id = req.params.id 

        const newId = req.body.id as number | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined
    
        // const usersToEdit = Users.find((users) => users.id === id)
    

        if(newId !== undefined){
            if(typeof newId !== "number"){
                res.status(400)
                throw new Error("'id' deve ser um number")
            }
        }
        if(newEmail !== undefined){
            if( newEmail.length < 5){
                res.status(400)
                throw new Error("'email' invalido")
            }
        }

        if(newPassword !== undefined){
            if(newPassword.length < 3){
                res.status(400)
                throw new Error("A senha deve conter no minimo mais de 3 caracteres")
            }
        }
        
        const [user] = await db("users").where({id: id})
    
        // if(usersToEdit){
        //     usersToEdit.id = newId || usersToEdit.id
        //     usersToEdit.email = newEmail || usersToEdit.email
        //     usersToEdit.password = newPassword || usersToEdit.password
        // }

        if(user){
            const updateUser = {
                id: newId || user.id,
                email: newEmail || user.email,
                password: newPassword || user.password
            }

            await db("users").update(updateUser).where({id:id})
        } else{
            res.status(400)
            throw new Error("'id' não encontrada")
        }




    
    
        res.status(200).send( {message: "Atualização realizada com sucesso."})
        
    } catch (error) {

        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }


        
    }
})








// --------------------------------------------------------------------------------------

//                     PRODUCTS


app.get('/products',async (req:Request, res: Response) => {
   
    try {

        const result = await db("products")

        res.status(200).send({products: result})
        
    } catch (error:any) {

        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        
    }
   
   
   
   
 
})


// app.get('/products/searchName', async (req:Request, res: Response) => {

    // try {

    //     const q = req.query.q as string

    //     if(q !== undefined){
    //         if(q.length < 1){
    //              res.status(400)
    //             throw new Error("Deve haver ao menos 1 caracter")
            
    
    //         }

    //     }
    



    //     // const result = Product.filter((pro) => {
    //     //     return pro.name.toLocaleLowerCase().includes(q)
    //     // }) 

    //     const [product] = await db("products").where({name: q})
    
    //     res.status(200).send({products: product})


       

        
        
    // } catch (error: any) {
    //     console.log(error)

    //     if (res.statusCode === 200) {
    //         res.send(500)
    //     }
    //     res.send(error.message)

       

        

        
    // }




// })


app.delete('/products/:id', async (req: Request, res: Response) => {


    try {

        const id = req.params.id
        // const indexRemove = Product.findIndex((pro) => pro.id === id)

        const [product] = await db.select("*").from("products").where({id: id})
        

        if(!product){
            res.status(404)
            throw new Error("Id não encontrado")
        }


        
            await db("products").del().where({id:id})
        
    
        res.status(200).send("Produto removido com sucesso!")
        
    } catch (error) {

        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)

        // if (error instanceof Error) {
        //     res.send(error.message)
        // } else {
        //     res.send("Erro inesperado")
        // }

        
    }

})

app.post("/products", async (req: Request, res: Response) => {


    try {

        const {id, name, price, category } = req.body as TProduct

        const findId = Product.find((prod) => prod.id === id)

        

        if(findId){
            res.status(400)
            throw new Error("ID de produto Indisponivel! ")
        }

        await db.insert( {
            id: id,
             name: name,
              price: price,
               category: category
        }).into("products")
    
        
    
        res.status(201).send({message:'Produto Cadastrado com sucesso'})
    
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)


        
    }
})

app.get("/products/searchId", async (req: Request, res: Response) => {
    
    try {

        const q = req.query.q 

        if(q !== undefined){
            if(q.length < 1){
                 res.status(400)
                throw new Error("Deve haver ao menos 1 caracter")
            
    
            }

        }
    



        // const result = Product.filter((pro) => {
        //     return pro.name.toLocaleLowerCase().includes(q)
        // }) 

        const [product] = await db("products").where({id: q})
    
        res.status(200).send(product)


       

        
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.send(500)
        }
        res.send(error.message)

       

        

        
    }
    
    
    
    
    
    
    // const q = req.query.q as string
    // const result = Product.filter((pro) => {
    //     return pro.id.toLocaleLowerCase().includes(q)
    // })

    // res.status(200).send(result)
})

app.put("/products/:id", async (req: Request, res: Response) => {
    

    try {

        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as string | undefined

        // const productToEdit = Product.find((prod) => prod.id === id)


        if(newId !== undefined){
            if(newId[0] !== "p"){
                res.status(400)
                throw new Error("O ID do novo produto deve iniciar com a letra 'p'")
            }
        }

        // if(newId !== undefined){
        //     if(newId !== "string"){
        //         res.status(400)
        //         throw new Error("O ID do novo produto deve ser uma string")
        //     }
        // }

        // if(newName !== undefined){
        //     if(newName !== "string"){
        //         res.status(400)
        //         throw new Error("O Nome do novo produto deve ser uma string")
        //     }
        // }

        const [productToEdit] = await db("products").where({id:id})

        if(productToEdit){
            const updateProdutct = {
                id: newId || productToEdit.id,
                name: newName || productToEdit.name,
                price: newPrice || productToEdit.price,
                category: newCategory || productToEdit.category
            }

            await db("products").update(updateProdutct).where({id:id})
        }else{
            res.status(400)
            throw new Error("ID não encontrada")
        }


        // if(productToEdit){
        //     productToEdit.id = newId || productToEdit.id
        //     productToEdit.name = newName || productToEdit.name
        //     productToEdit.category = newCategory || productToEdit.category


        //     productToEdit.price = isNaN(newPrice) ? productToEdit.price: newPrice
        //     // productToEdit.price = isNan(newPrice) ? productToEdit.price : newPrice
        // }

        res.status(200).send({message:"Produto editado com sucesso!"})
        
    } catch (error) {

        
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        
    }
    
    
    
    
    

})












//--------------------------------------------------------------------------------------

//                         PURCHASE

app.get("/purchase", async (req: Request, res: Response) => {
    
    
    try {

        const result = await db.select("*").from("purchases")
        res.status(200).send({purchases: result})
    } catch (error) {
          
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

        
    }
})


app.get("/purchases/:search", async (req: Request, res: Response) => {

try {

    const q = req.params.q 

    if(q !== undefined){
        if(q[0] !== "C"){
            res.status(400)
            throw new Error("A busca por uma compra registrada deve inciar com 'C'")
        }
    }

    // const result = Purchase.filter((purchases) => {
    //     return purchases.userId.toLocaleLowerCase().includes(q)
    // })

    const [result] = await db("purchases").where({id: q})

    
    res.status(200).send(result)

    
    
} catch (error) {

    console.log(error)

    if (res.statusCode === 200) {
        res.send(500)
    }
    res.send(error.message)

    
}

  
})



app.post("/purchases", async ( req: Request, res: Response) => {
    // const {userId, productId, quantity, totalPrice} = req.body as TPurchase


    try {


    //     id TEXT PRIMARY KEY UNIQUE NOT NULL,
    // total_price REAL NOT NULL,
    // paid INTEGER NOT NULL,
    // delivered_at TEXT DATETIME,
    // buyer_id TEXT NOT NULL,

        
        const id = req.body.id
        const total_price = req.body.total_price
        const paid = req.body.paid
        const delivered_at = req.body.delivered_at
        const buyer_id = req.body.buyer_id
    
    
        // const findId = Purchase.find((purchase) => purchase.productId === productId)
        // const findUser = Purchase.find((purchase) => purchase.userId === userId)
        
    
        // if(!findUser){
        //     res.status(400)
        //     throw new Error("Esse ID não foi encontrado")
        // }
    
        // if(!findId){
        //     res.status(400)
        //     throw new Error("Esse ID não foi encontrado")
        // }
    
        // if(findId.price * quantity !== totalPrice){
        //     res.status(400)
        //     throw new Error("Valor errado")
        // }
    
        const newPurchase ={
            id: id,//purchase_id é o nome na minha tabela sql
            total_price: total_price,
            paid:paid,
            delivered_at:delivered_at,
            buyer_id: buyer_id
        }


        await db.insert(newPurchase).into("purchases")
        

        // const newPurchase: TPurchase = {
        //     userId,
        //     productId,
        //     quantity,
        //     price,
        //     totalPrice
        // }
    
        // Purchase.push(newPurchase)
        
        res.status(201).send("Nova compra registrada com sucesso!")
        
    } catch (error: any) {

        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
       res.send(error.message)


        
    }
})


