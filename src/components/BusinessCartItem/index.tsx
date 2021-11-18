import { RiBankCardLine, RiMoneyDollarBoxLine } from "react-icons/ri";

import styles from "./BusinessCartItem.module.scss";

type ItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  quantity: number;
  value: number;
  productId: string;
  payMethod?: "money" | "bankCard";
  isFinished: boolean;
  requestId: string;
};

export function BusinessCartItem({
  name,
  value,
  quantity,
  productId,
  payMethod,
  isFinished,
  ...rest
}: ItemProps) {
  return (
    <button
      className={`${styles.container} ${isFinished && styles.buttonDisabled}`}
      {...rest}
    >
      <div className={styles.title}>
        <h1>{name}</h1>
        {payMethod && payMethod === "bankCard" ? (
          <RiBankCardLine size={30} color="rgba(0,0,0,0.5)" />
        ) : (
          <RiMoneyDollarBoxLine size={30} color="rgba(0,0,0,0.5)" />
        )}
      </div>
      <div>
        <p>R$: {value.toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
        <span>{quantity}X</span>
      </div>
    </button>
  );
}
