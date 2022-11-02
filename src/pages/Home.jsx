import React, { useContext } from "react";
import { Card } from "../components/Card";

function Home({
  items,
  searchVal,
  setSearchVal,
  onChangeSearch,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderIntems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchVal.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchVal ? `Поиск по запросу: ${searchVal}` : "Все кроссовки"}
        </h1>
        <div className="search__block d-flex">
          <img src="/img/search.svg" alt="search" />
          {searchVal && (
            <img
              className="cu-p clear"
              src="/img/btn-remove.svg"
              alt="cleare"
              onClick={() => setSearchVal("")}
            />
          )}
          <input
            onChange={onChangeSearch}
            value={searchVal}
            placeholder="Поиск..."
          ></input>
        </div>
      </div>

      <div className="d-flex flex-wrap cards">{renderIntems()}</div>
    </div>
  );
}

export default Home;
