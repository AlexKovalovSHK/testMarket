import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { fechAllReviews, fetchGoodsList } from "./marketApi"
import { Answer, Goods, GoodsList, MyInitialState, Review } from "./type"

const initialState: MyInitialState = {
  goodsList: {} as GoodsList,
  review: [] as Review[],
  answers: [] as Answer[],
  basket: {
    goods: [] as Goods[],
    preis: 0
  },
}

export const marketSlice = createAppSlice({
  name: "market",
  initialState,
  reducers: create => ({
    addGoodsInBasket: create.reducer((state, action: PayloadAction<Goods>) => {
      state.basket.goods.push(action.payload)
      state.basket.preis += action.payload.price
    }),
     removeFromBasket: create.reducer((state, action: PayloadAction<Goods>) => {
      // Находим индекс товара (по id или другим уникальным полям)
      const index = state.basket.goods.findIndex(
        item => item.id === action.payload.id
      );
      
      // Если товар найден, удаляем его
      if (index !== -1) {
        state.basket.goods.splice(index, 1);
        state.basket.preis -= action.payload.price;
      }
    }),
    getGoodsList: create.asyncThunk(
      async () => {
        const response = await fetchGoodsList()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "success"
          state.goodsList = action.payload
        },
        rejected: state => {
          state.status = "error"
        },
      },
    ),
    getReviews: create.asyncThunk(
      async () => {
        const response = await fechAllReviews()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "success"
          state.review = action.payload
        },
        rejected: state => {
          state.status = "error"
        },
      },
    ),
  }),
  selectors: {
    selectBasket: state => state.basket,
    selectGoodsList: state => state.goodsList,
    selectRewiewList: state => state.review,
    selectAnswList: state => state.answers,
  },
})

export const { addGoodsInBasket, getReviews, getGoodsList, removeFromBasket } =
  marketSlice.actions

export const {
  selectBasket,
  selectGoodsList,
  selectRewiewList,
  selectAnswList,
} = marketSlice.selectors
