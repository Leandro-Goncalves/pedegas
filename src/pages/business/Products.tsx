import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { ItemProduct } from "../../components/ItemProduct";
import { useUsers } from "../../contexts/UserContext"
import { database } from "../../services/firebase";

import styles from '../../styles/pages/business/Products.module.scss';

type Iten = {
  name: string;
  value: number;
  image: string;
  quantity: number;
  productId: string;
}

export default function Products() {

  const {
    user,
    isStore,
    userUid
  } = useUsers()

  const [itensData, setItensData] = useState<Iten[]>([]);
  

  useEffect(() => {
    async function load() {
      database.ref('stores').child(userUid).on("value", storeData => {
        const itens = [] as Iten[];
      
        Object.entries(storeData.val().itens || []).forEach(([key, value]) => {
          const typeValue = value as Iten;
          itens.push({...typeValue, productId:key})
        });

        console.log(itens)
        setItensData(itens)
      })
    }
    load()
  },[userUid])

  function removeCallback(productId:string) {
    database.ref("stores")
    .child(userUid).child("itens").child(productId).remove()
  }

  return(
    <>
      <Header
        userName={user.name}
        isStore={isStore}
        isRightItem={false}
      />
      <div className={styles.container}>
        {itensData.map(iten => (
          <ItemProduct
            removeCallback={removeCallback}
            noAnimation
            key={iten.productId}
            {...iten}
          />
        ))}
      </div>
    </>
  )
}