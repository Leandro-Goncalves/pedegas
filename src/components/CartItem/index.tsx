import { useHistory } from 'react-router-dom';
import { RiCloseCircleLine } from 'react-icons/ri'

import styles from './CartItem.module.scss';
import { database } from '../../services/firebase';
import { useUsers } from '../../contexts/UserContext';

type ItemProps = {
  name: string;
  quantity: number;
  value: number;
  productId: string;
}


export function CartItem({
  name,
  value,
  quantity,
  productId,
}:ItemProps) {

  const history = useHistory()

  const {
    userUid
  } = useUsers()

  async function removeItem() {
    database.ref("users")
    .child(userUid).child("cart").child(productId).remove()
  }

  return(
    <div className={styles.container}>
      <button onClick={removeItem}><RiCloseCircleLine/></button>
      <h1>{name}</h1>
      <div>
        <p>R$: {value.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
        <span>{quantity}X</span>
      </div>
    </div>
  )
}