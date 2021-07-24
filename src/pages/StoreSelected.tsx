import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { StoreCard } from "../components/StoreCard";
import { useUsers } from "../contexts/UserContext";
import { database } from "../services/firebase";
import { useParams } from 'react-router-dom';

import styles from '../styles/pages/Store.module.scss';
import { ItemProduct } from "../components/ItemProduct";

type StoreParams = {
  id: string
}

type Iten = {
  name: string;
  value: number;
  image: string;
  quantity: string;
  productId: string;
}

type storeDataProps = {
  name: string;
  email: string;
  password: string;
  cep: number;
  number: number;
  image: string;
  haveTelephone: boolean;
  haveGasStop: boolean;
  haveFoods: boolean;
  storeId: string;
  itens: Iten[]
}

export function StoreSelected() {

  const {
    user,
  } = useUsers()
  
  const [storeData, setStoreData] = useState<storeDataProps>({} as storeDataProps);
  const [itensData, setItensData] = useState<Iten[]>([]);

  const { id } = useParams<StoreParams>();

  useEffect(() => {
    async function load() {
      const storeData = await database.ref('stores').child(id).get()
      setStoreData(storeData.val())
      const itens = [] as Iten[];
      
      Object.entries(storeData.val().itens).forEach(([key, value]) => {
        const typeValue = value as Iten;
        itens.push({...typeValue, productId:key})
      });

      setItensData(itens)
      
    }
    load()
  },[id])

  return(
    <div>
      <Header userName={user.name}/>
      <StoreCard name="Sei lá" image={storeData.image}/>
      <div className={styles.container}>
        {itensData.map(iten => <ItemProduct {...iten} sendto={":id"}/>)}
      </div>
    </div>
  )
}