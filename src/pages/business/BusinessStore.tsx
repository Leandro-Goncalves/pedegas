import { useState } from "react";
import { AddItemModal } from "../../components/AddItemModal";
import { Header } from "../../components/Header";
import { useUsers } from "../../contexts/UserContext";
import { RiArchiveLine, RiDraftLine } from "react-icons/ri";

import styles from "../../styles/pages/business/BusinessStore.module.scss";
import { useHistory } from "react-router-dom";

export function BusinessStore() {
  const history = useHistory();

  const { user, isStore } = useUsers();

  const [modal, setModal] = useState(false);

  return (
    <>
      <Header
        userName={user.name}
        isStore={isStore}
        StoreCallback={() => {
          setModal(true);
        }}
      />
      <AddItemModal
        isOpen={modal}
        contentLabel="Add Item Modal"
        shouldCloseOnOverlayClick
        closeModal={() => {
          setModal(false);
        }}
      />
      <div className={styles.container}>
        <button
          onClick={() => {
            history.push("orders");
          }}
          className={styles.item}
          style={{ backgroundColor: "var(--blue)" }}
        >
          <h1>
            Pedidos <RiDraftLine />
          </h1>
        </button>
        <button
          onClick={() => {
            history.push("producs");
          }}
          className={styles.item}
          style={{ backgroundColor: "var(--green-dark)" }}
        >
          <h1>
            Produtos <RiArchiveLine />
          </h1>
        </button>
      </div>
    </>
  );
}
