import React, { useContext, useEffect, useState } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import AppContext from "../context";

function Orders() {
  const { onAddToCart, onAddToFavorite } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://634eb529f34e1ed826940a8f.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.item], []));

        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap cards">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
