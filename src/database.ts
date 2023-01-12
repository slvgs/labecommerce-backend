import { CATEGORY_TYPE, TCliente } from "./type";
import { TProduct } from "./type";
import { TPurchase } from "./type";


export const Users: TCliente[] = [

    {
        id: "gabriellaS",
        email: "gabriella@labenu.com",
        password: "astrodev"
    },

    {
        id: "vitoriazinha",
        email: "vitoria@labenu.com",
        password: "vitoria123"

    }
    



]

export const Product: TProduct [] = [
    {
        id: "2088",
        name: "RumiKub",
        price: 250.00 ,
        category: CATEGORY_TYPE.GAMESTABULEIRO
    },

    {
        id: "2089",
        name: "Call Of Duty - Para PC",
        price: 150.00,
        category: CATEGORY_TYPE.GAMESPC
    }
]


export const Purchase: TPurchase []= [{
    userId: "gabriellaS",
    productId: "2088",
    quantity: 1,
    totalPrice: 250.00
}]


export function createUser(id: string, email: string, password: string): string{
    Users.push({
        id,
        email,
        password
    })

    return ("Cadastro realizado com sucesso!")
};

export function getAllUsers(): TCliente[]{
    return Users
};

export function createProduct(id: string, name: string, price: number, category: CATEGORY_TYPE ): any{
    Product.push({
        id,
        name,
        price,
        category

    })
}


export function gettAllProducts(): TProduct[]{
    return Product
}

export function getProductById(id: string): TProduct[]{
    return Product.filter(product => product.id === id )
}

export function queryProductsByName(q: string ): TProduct[]{
    return Product.filter(product => product.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()))
}


export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): any{
    Purchase.push({
        userId,
        productId,
        quantity,
        totalPrice
    })
}