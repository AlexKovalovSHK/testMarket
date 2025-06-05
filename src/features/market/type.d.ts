export interface NewOrder {
  phone: string
  carts: Cart[]
}

export interface Cart {
  id: number
  quantity: number
}

export interface Goods {
  id: number
  image_url: string
  title: string
  description: string
  price: number
  quantity?: number
}

export interface GoodsList {
  page: number
  amount: number
  total: number
  items: Goods[]
}

//review
export interface Review {
  id: number
  text: string
}
//answer

export interface Answer {
  success: number
  error: string
}

export interface Basket {
  goods: Goods[]
  preis: number
}

export interface MyInitialState {
  goodsList: GoodsList
  review: Review[]
  answers: Answer[]
  basket: Basket
  status?: "idle" | "loading" | "success" | "error"
}
