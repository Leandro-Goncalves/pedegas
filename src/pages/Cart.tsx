import { useEffect, useState } from "react";
import { useUsers } from "../contexts/UserContext";
import { database } from "../services/firebase";
import { RiArrowLeftLine, RiShoppingCart2Line } from "react-icons/ri";

import styles from "../styles/pages/Cart.module.scss";
import { Button } from "../components/Button";
import { CartItem } from "../components/CartItem";
import { PayMethodModal } from "../components/PayMethodModal";
import { useHistory } from "react-router";

type CartData = {
  name: string;
  quantity: number;
  value: number;
  productId: string;
  storeId: string;
};

export function Cart() {
  const history = useHistory();
  const { userUid, user } = useUsers();

  const [cartData, setCartData] = useState<CartData[]>([]);
  const [isPayMethodModal, setIsPayMethodModal] = useState(false);

  useEffect(() => {
    async function LoadCartData() {
      const CartRef = database.ref("users").child(userUid).child("cart");
      CartRef.on("value", (stores) => {
        const CartDataState = [] as CartData[];

        stores.forEach((itens) => {
          itens.forEach((iten) => {
            const cartItensType = iten.val();
            CartDataState.push({
              ...cartItensType,
              productId: iten.key,
              storeId: itens.key,
            });
          });
        });

        setCartData(CartDataState);
      });
    }

    LoadCartData();
  }, [userUid]);

  function formatValue(value: number) {
    return value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
  }

  async function checkout(payMethod: "money" | "bankCard") {
    cartData.forEach(async (item) => {
      const value = await database
        .ref("stores")
        .child(item.storeId)
        .child("itens")
        .child(item.productId)
        .get();

      if (value.val().quantity <= item.quantity) {
        await database
          .ref("stores")
          .child(item.storeId)
          .child("itens")
          .child(item.productId)
          .remove();
      } else {
        await database
          .ref("stores")
          .child(item.storeId)
          .child("itens")
          .child(item.productId)
          .child("quantity")
          .set(value.val().quantity - item.quantity);
      }

      await database
        .ref("requests")
        .child(item.storeId)
        .push({
          name: item.name,
          quantity: item.quantity,
          value: item.value,
          productId: item.productId,
          isFinished: false,
          payMethod,
          userInformation: {
            name: user.name,
            cep: user.cep,
            number: user.number,
          },
        });
    });

    await database.ref("users").child(userUid).child("cart").remove();
    setIsPayMethodModal(false);
  }

  return (
    <>
      <RiArrowLeftLine
        style={{
          color: "black",
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
        size={30}
        onClick={() => history.goBack()}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <RiShoppingCart2Line size={80} />
        </div>
        {cartData.map((cart) => (
          <CartItem key={cart.productId} {...cart} />
        ))}
        <div className={styles.footer}>
          <h1>
            Total:
            <span>
              {" "}
              R$:{" "}
              {formatValue(
                cartData.reduce((a, b) => a + b.quantity * b.value, 0)
              )}
            </span>
          </h1>

          <Button
            text="Finalizar Comprar"
            onClick={() => setIsPayMethodModal(true)}
          />
        </div>
        <PayMethodModal
          isOpen={isPayMethodModal}
          contentLabel="Store Modal"
          closeModal={() => setIsPayMethodModal(false)}
          callback={checkout}
        />
      </div>
    </>
  );
}
