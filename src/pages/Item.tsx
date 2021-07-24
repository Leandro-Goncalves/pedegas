import { createRef, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { QuantityProductInput } from "../components/QuantityProductInput";
import { useUsers } from "../contexts/UserContext";
import { database } from "../services/firebase";
import { toast } from 'react-toastify';

import styles from '../styles/pages/Item.module.scss';

type StoreParams = {
  id: string,
  productId: string,
}

type Iten = {
  name: string;
  value: number;
  image: string;
  quantity: string;
  itemId: string;
}

export function Item() {

  const {
    user,
    userUid
  } = useUsers()

  const history = useHistory()

  const { id, productId } = useParams<StoreParams>();

  const [itemData, setItemData] = useState<Iten>({} as Iten);

  const [isLoading, setIsLoading] = useState(false);
  
  const quantity = createRef<HTMLInputElement>()

  useEffect(() => {
    async function load() {
      const storeData = database.ref('stores')
      .child(id).child("itens").child(productId);

      storeData.on("value", data => {
        setItemData({...data.val(), itemId:data.key});
      })
    }
    load()
  },[id, productId])

  async function handleAddItemCart() {
    if(!quantity.current){
      alert("retrn")
      return
    }

    const quantityValue = quantity.current.value;

    if(Number(quantityValue) <= 0) {
      toast.warn("Você precisa colocar mais de 1 item no carrinho !")
      return
    }
    setIsLoading(true);

    const itemExistInCart = await database.ref("users")
    .child(userUid).child("cart").child(itemData.itemId).get();

    
    await database.ref("users").child(userUid).child("cart").child(itemData.itemId).set({
      name:itemData.name,
      value: itemData.value,
      quantity: itemExistInCart.val()
      ? Number(itemExistInCart.val().quantity) + Number(quantityValue)
      : Number(quantityValue)
    })

    setIsLoading(false);
    toast.success("Produtos adicionados ao carrinho carrinho !")

    history.push("/store")
  }

  return(
    <div className={styles.container}>
      <Header userName={user.name}/>
      <div className={styles.data}>
        <div className={styles.image}>
          <img src={itemData.image} alt={itemData.name} />
        </div>
        <nav>
          <h1>{itemData.name}</h1>
          <h2>R$: {itemData.value?.toLocaleString('pt-br', {minimumFractionDigits: 2})}</h2>
          <QuantityProductInput ref={quantity} maxQuantity={Number(itemData.quantity)}/>
          <Button
            text="Colocar no carrinho"
            onClick={handleAddItemCart}
            isLoading={isLoading}
            loadingColor="white"
          />
        </nav>
      </div>
    </div>
  )
}