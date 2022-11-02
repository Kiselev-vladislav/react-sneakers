import React, { useContext } from "react";
import AppContext from "../context";

const Info = ({ title, image, description }) => {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className="cartEmpety d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width={120}
        height={120}
        src={image}
        alt="empty cart"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
