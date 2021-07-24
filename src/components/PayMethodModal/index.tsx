import { useState } from 'react';
import Modal, {Props} from 'react-modal';
import styles from './PayMethodModal.module.scss';
import { Button } from '../Button';
import { Input } from '../Input';
import { InputNumber } from '../InputNumber';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { database } from '../../services/firebase';
import { useUsers } from '../../contexts/UserContext';
import { QuantityInput } from '../QuantityInput';
import {
  RiBankCardLine,
  RiMoneyDollarBoxLine,
  RiCloseLine
} from 'react-icons/ri';

type StoreModalProps = Props & {
  closeModal: () => void
}

export function PayMethodModal({
  closeModal,
  ...props
}:StoreModalProps) {
  Modal.setAppElement('#root');

  const {
    userUid
  } = useUsers()


  return(
    <Modal
      overlayClassName={styles.overlay}
      className={styles.content}
      {...props}
    >
      <button
        className={styles.close}
        onClick={closeModal}
      >
        <RiCloseLine/>
      </button>
      <h1>Selecione o metodo de pagamento</h1>
      <nav>
        <button>
          <RiBankCardLine size={200}/>
        </button>
        <button>
          <RiMoneyDollarBoxLine size={200}/>
        </button>
     </nav>
    </Modal>
  )
}