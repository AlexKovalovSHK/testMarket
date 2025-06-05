import Button from "react-bootstrap/Button"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addGoodsInBasket, removeFromBasket, selectGoodsList } from "../features/market/marketSlice"
import { Goods, GoodsList } from "../features/market/type"

const Market = () => {
  const dispatch = useAppDispatch()
  const goodsList: GoodsList = useAppSelector(selectGoodsList)

  const handleAddInBasket = (goods: Goods) => {
    console.log(goods)
    dispatch(addGoodsInBasket(goods))
  }

  const handleARmFromBasket = (goods: Goods) => {
    console.log(goods)
    dispatch(removeFromBasket(goods))
  }

  return (
    <div className="row p-2">
      {goodsList.items ? (
        goodsList.items.map((g, i) => (
          <div className="col-lg-4 p-2 App" key={i}>
            <div className=" border border-success rounded p-2">
              <img src={g.image_url} alt="img" />
              <h5 className="mt-3">{g.title}</h5>
              <p>{g.description}</p>
              <h4>{g.price} руб.</h4>
              <div className="d-flex justify-content-around">
                <Button
                variant="dark"
                className="mb-3 w-25"
                onClick={() => handleAddInBasket(g)}
              >
                +
              </Button>
              <Button
                variant="dark"
                className="mb-3 w-25"
                onClick={() => handleARmFromBasket(g)}
              >
                -
              </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default Market
