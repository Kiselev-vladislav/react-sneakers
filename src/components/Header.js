export function Header() {
  return (
    <header className="d-flex justify-between align-center p-40">
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

      <div></div>
      <div>
        <ul className="d-flex">
          <li className="mr-30">
            <img
              className="mr-15"
              width={18}
              height={18}
              src="/img/cart.svg"
              alt="cart"
            />
            <span>1205 руб.</span>
          </li>
          <li className="mr-30 like">
            <img width={18} height={18} src="/img/like.svg" alt="cart" />
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="cart" />
          </li>
        </ul>
      </div>
    </header>
  );
}
