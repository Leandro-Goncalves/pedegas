import { useEffect, useState } from "react"
import { useUsers } from "../contexts/UserContext";
import { database } from "../services/firebase";
import { RiShoppingCart2Line } from 'react-icons/ri';

import styles from '../styles/pages/Cart.module.scss';
import { Button } from "../components/Button";
import { CartItem } from "../components/CartItem";
import { PayMethodModal } from "../components/PayMethodModal";

type CartData = {
  name: string;
  quantity: number;
  value: number;
  productId: string;
}

export function Cart() {

  const {
    userUid
  } = useUsers()

  const [cartData, setCartData] = useState<CartData[]>([]);
  const [isPayMethodModal, setIsPayMethodModal] = useState(false);
  
  

  useEffect(() => {
    async function LoadCartData() {

      const CartRef = database.ref('users').child(userUid).child("cart");
      CartRef.on("value", DataSnapshot => {

        const CartDataState = [] as CartData[];
        
        DataSnapshot.forEach(cartItens => {
          const cartItensType = cartItens.val()
          CartDataState.push({...cartItensType, productId:cartItens.key})
        })

        setCartData(CartDataState)
      })
    }

    LoadCartData()
  }, [userUid])

  function formatValue(value: number) {
    return(value.toLocaleString('pt-br', {minimumFractionDigits: 2}))
  }

  return(
    <div className={styles.container}>
      <div className={styles.header}><RiShoppingCart2Line size={80}/></div>
      {cartData.map(cart => <CartItem  {...cart}/> )}
      <div className={styles.footer}>
        <h1>Total:
          <span> R$: {formatValue(cartData.reduce((a,b) => a + (b.quantity * b.value), 0))}</span>
        </h1>

        <Button text="Finalizar Comprar" onClick={()=>setIsPayMethodModal(true)}/>
      </div>
      <PayMethodModal
        isOpen={isPayMethodModal}
        contentLabel="Store Modal"
        closeModal={()=>setIsPayMethodModal(false)}
      />
    </div>
  )
}