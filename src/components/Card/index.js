import React, { useState, useContext } from "react";
import AppContext from "../../context";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

export function Card({
  id,
  title,
  img,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, title, img, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={250}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="106" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="231" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="5" ry="5" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
                alt="unliked"
              />
            </div>
          )}
          <img width="100%" height={135} src={img} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
