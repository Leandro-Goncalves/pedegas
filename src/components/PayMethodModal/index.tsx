import Modal, { Props } from "react-modal";
import styles from "./PayMethodModal.module.scss";
import {
  RiBankCardLine,
  RiMoneyDollarBoxLine,
  RiCloseLine,
} from "react-icons/ri";

type StoreModalProps = Props & {
  closeModal: () => void;
  callback: (chosen: "money" | "bankCard") => void;
};

export function PayMethodModal({
  closeModal,
  callback,
  ...props
}: StoreModalProps) {
  Modal.setAppElement("#root");

  return (
    <Modal
      overlayClassName={styles.overlay}
      className={styles.content}
      {...props}
    >
      <button className={styles.close} onClick={closeModal}>
        <RiCloseLine />
      </button>
      <h1>Selecione o metodo de pagamento</h1>
      <nav>
        <button onClick={() => callback("bankCard")}>
          <RiBankCardLine size={200} />
        </button>
        <button onClick={() => callback("money")}>
          <RiMoneyDollarBoxLine size={200} />
        </button>
      </nav>
    </Modal>
  );
}
