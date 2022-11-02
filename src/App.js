import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://634eb529f34e1ed826940a8f.mockapi.io/cart"),
            axios.get("https://634eb529f34e1ed826940a8f.mockapi.io/favorite"),
            axios.get("https://634eb529f34e1ed826940a8f.mockapi.io/items"),
          ]);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при добавлении в корзину");
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://634eb529f34e1ed826940a8f.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);

        const { data } = await axios.post(
          "https://634eb529f34e1ed826940a8f.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [
          ...prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        ]);
      }
    } catch (error) {
      console.log("Ошибка при добавлении в корзину");
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(
        `https://634eb529f34e1ed826940a8f.mockapi.io/cart/${id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSearch = (event) => {
    setSearchVal(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://634eb529f34e1ed826940a8f.mockapi.io/favorite/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://634eb529f34e1ed826940a8f.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("не удалось добавить в закладки");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        items,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                onChangeSearch={onChangeSearch}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              ></Home>
            }
          ></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/Orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
