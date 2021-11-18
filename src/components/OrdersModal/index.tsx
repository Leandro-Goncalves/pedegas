import Modal, { Props } from "react-modal";
import styles from "./OrdersModal.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { requests } from "../../pages/business/Orders";
import { useEffect, useState } from "react";
import cep, { CEP } from "cep-promise";
import { Button } from "../Button";

type StoreModalProps = Props & {
  closeModal: () => void;
  callback: (id: string) => void;
  Itendata: requests | null;
};

export function OrdersModal({
  closeModal,
  callback,
  Itendata,
  ...props
}: StoreModalProps) {
  Modal.setAppElement("#root");

  const [cepData, setCepData] = useState<CEP>({} as CEP);

  useEffect(() => {
    if (!Itendata?.userInformation.cep) return;

    cep(Itendata.userInformation.cep).then((response: CEP) => {
      setCepData(response);
    });
  }, [Itendata]);

  return (
    <Modal
      overlayClassName={styles.overlay}
      className={styles.content}
      {...props}
    >
      <button className={styles.close} onClick={closeModal}>
        <RiCloseLine />
      </button>
      <h1>
        {Itendata?.name}
        <span>X{Itendata?.quantity}</span>
      </h1>
      <h2>{Itendata?.userInformation.name}</h2>
      <h3>Estado: {cepData.state}</h3>
      <h3>Cidade: {cepData.city}</h3>
      <h3>Bairro: {cepData.neighborhood}</h3>
      <h3>Rua: {cepData.street}</h3>
      <h3>Numero: {Itendata?.userInformation.number}</h3>
      <Button
        text="Entregue"
        onClick={() => {
          callback(Itendata?.requestId || "");
        }}
      />
    </Modal>
  );
}

//callback(Itendata?.Itendata)}
