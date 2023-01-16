export type TCliente = {
    id: string
    email: string
    password: string
};

export type TProduct = {
    id: string
    name: string
    price: number
    category: string
}

export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    price: number
    totalPrice: number

}

export enum CATEGORY_TYPE  {

    GAMESTABULEIRO = "Tabuleiro",
    GAMESPC = "PC",
    GAMESCONSOLE = "Console"

}