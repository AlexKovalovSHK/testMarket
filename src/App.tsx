import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import { Route, Routes, useNavigate } from "react-router-dom"
import Market from "./components/Market"
import Rewiew from "./components/Rewiew"
import Button from "react-bootstrap/Button"
import { useEffect } from "react"
import { getGoodsList, getReviews } from "./features/market/marketSlice"
import { useAppDispatch } from "./app/hooks"
import BasketComp from "./components/BasketComp"

export const URL = "http://o-complex.com:1337"



const App = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getGoodsList())
    dispatch(getReviews())
  }, [dispatch])

  return (
   <div className="">
    <header className="d-flex m-2">
      <Button variant="secondary" className="ms-2" onClick={() => navigate('/')}>Магазин</Button>
      <Button variant="secondary" className="ms-2" onClick={() => navigate('/rew')}>Отзывы</Button>
      <Button variant="secondary" className="ms-2" onClick={() => navigate('/basket')}>Корзина</Button>
    </header>
    <Routes>
      <Route path="/" element={<Market />} />
      <Route path="/basket" element={<BasketComp />} />
      <Route path="/rew" element={<Rewiew />} />
    </Routes>
  </div>
  )
}

export default App
