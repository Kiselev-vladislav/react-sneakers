import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export function Header(props) {
  const { totalPrice } = useCart();
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img
            className="mr-15"
            width={40}
            height={40}
            src="/img/logo.png"
            alt="logo"
          />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазиг лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <div></div>
      <div>
        <ul className="d-flex">
          <li className="mr-30 cu-p" onClick={props.onClickCart}>
            <img
              className="mr-15"
              width={18}
              height={18}
              src="/img/cart.svg"
              alt="cart"
            />
            <span>{totalPrice} руб.</span>
          </li>
          <li className="mr-30 like">
            <Link to={"/favorites"}>
              <img
                width={18}
                height={18}
                src="/img/unliked.svg"
                alt="favorites"
              />
            </Link>
          </li>
          <li>
            <Link to={"/orders"}>
              <img width={18} height={18} src="/img/orders.svg" alt="orders" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
