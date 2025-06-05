import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBasket } from "../features/market/marketSlice";
import { Basket, Cart, Goods, NewOrder } from "../features/market/type";
import { fechGeneretOrder } from "../features/market/marketApi";

const BasketComp = () => {
  const basket: Basket = useAppSelector(selectBasket);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Маска для телефона
  const formatPhoneInput = (value: string): string => {
    if (!value) return value;
    
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    
    if (!match) return value;
    
    let formatted = "+7";
    if (match[2]) formatted += ` (${match[2]}`;
    if (match[3]) formatted += `) ${match[3]}`;
    if (match[4]) formatted += `-${match[4]}`;
    if (match[5]) formatted += `-${match[5]}`;
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
    setError("");
  };

  const validatePhone = (): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 11 && cleaned.startsWith("7");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!phone.trim()) {
      setError("Введите номер телефона");
      setIsLoading(false);
      return;
    }

    if (!validatePhone()) {
      setError("Введите корректный номер телефона");
      setIsLoading(false);
      return;
    }

    try {
        const cartList: Cart[] = basket.goods.map((good: Goods) => ({
    id: good.id,
    quantity: good.quantity || 1, // Используем quantity из Goods или 1 по умолчанию
  }));

      const dto: NewOrder = {
        phone: phone,
        carts: cartList
      }
      console.log(dto);
      
      fechGeneretOrder(dto).then((data) => {alert('Заказ успешно оформлен - ждите!!!')})
    } catch (err) {
      setError("Ошибка соединения с сервером");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="order-success">
        <h3>Спасибо за заказ!</h3>
        <p>Мы свяжемся с вами по номеру {phone}</p>
      </div>
    );
  }

  return (
    <div className="basket-container">
      <h2>Ваша корзина</h2>
      
      {basket.goods.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <div className="basket-items">
            {basket.goods.map((item, index) => (
              <div key={index} className="basket-item">
                <span>{item.title}</span>
                <span>{item.price} руб.</span>
              </div>
            ))}
          </div>
          
          <div className="basket-total">
            <h3>Итого: {basket.preis} руб.</h3>
          </div>

          <form className="order-form" onSubmit={handleSubmit}>
            <h3>Оформление заказа</h3>
            
            <div className={`form-group ${error ? "has-error" : ""}`}>
              <label htmlFor="phone">Номер телефона*</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                className="phone-input"
                maxLength={18}
              />
              {error && <div className="error-message">{error}</div>}
              <div className="hint">Формат: +7 (XXX) XXX-XX-XX</div>
            </div>
            
            <button 
              type="submit" 
              className="order-btn"
              disabled={isLoading}
            >
              {isLoading ? "Обработка..." : "Заказать"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default BasketComp;