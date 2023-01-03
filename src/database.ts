import { TCliente } from "./type";
import { TProduct } from "./type";
import { TPurchase } from "./type";


export const Users: TCliente[] = [

    {
        id: "gabriellaS",
        email: "gabriella@labenu.com",
        password: "astrodev"
    }

    



]

export const Product: TProduct [] = [
    {
        id: "2088",
        name: "PACOTTE OFFICE COMPLETO",
        price: 100.00 ,
        category: "#PCS"
    }
]


export const Purchase: TPurchase []= [{
    userId: "gabriellaS",
    productId: "2088",
    quantity: 1,
    totalPrice: 100.00
}]