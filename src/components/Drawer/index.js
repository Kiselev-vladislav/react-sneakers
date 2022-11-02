import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import Info from "../Info";
import axios from "axios";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Drawer({ onClose, items = [], onRemove, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    console.log(cartItems);
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://634eb529f34e1ed826940a8f.mockapi.io/orders",
        { item: cartItems }
      );
      console.log(data);

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://634eb529f34e1ed826940a8f.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={`${styles.drawer} p-20`}>
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="close"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div className="cart__item d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.img})` }}
                    className="cart__img "
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    className="remove__btn"
                    src="/img/btn-remove.svg"
                    alt="remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб. </b>
                </li>
              </ul>

              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте товары для заказа"
            }
            image={
              isOrderComplete
                ? "/img/complete_order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}
