import styled from "./index.module.scss";
import { RiLogoutBoxRLine, RiArrowLeftLine } from "react-icons/ri";
import { useUsers } from "../../contexts/UserContext";

import { Cart } from "./Cart";
import { AddItemButton } from "./AddItemButton";
import { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { useHistory } from "react-router";

type HeaderProps = {
  userName: string;
  isStore?: boolean;
  isRightItem?: boolean;
  StoreCallback?: () => void;
};

export function Header({
  userName,
  isStore = false,
  isRightItem = true,
  StoreCallback = () => {},
}: HeaderProps) {
  const history = useHistory();
  const { logout, userUid } = useUsers();

  const [cartItens, setCartItens] = useState(0);

  useEffect(() => {
    if (!userUid) {
      return;
    }

    database
      .ref("users")
      .child(userUid)
      .child("cart")
      .on("value", (stores) => {
        let CartItensState = 0;

        stores.forEach((items) => {
          items.forEach((item) => {
            const quantity = item.val().quantity as string;
            CartItensState += Number(quantity);
          });
        });

        setCartItens(CartItensState);
      });
  }, [userUid]);

  return (
    <div className={styled.container}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {window.location.pathname !== "/store" &&
          window.location.pathname !== "/business/store" && (
            <RiArrowLeftLine
              style={{ color: "black", cursor: "pointer" }}
              size={30}
              onClick={() => history.goBack()}
            />
          )}
        <h1>
          <RiLogoutBoxRLine onClick={logout} />
          {userName && `Ola ${userName}`}
        </h1>
      </div>
      {isRightItem &&
        (!isStore ? (
          <Cart itens={cartItens} />
        ) : (
          <AddItemButton callback={StoreCallback} />
        ))}
    </div>
  );
}
