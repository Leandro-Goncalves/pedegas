import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { Item } from "../components/Item";
import { useUsers } from "../contexts/UserContext"

import { database } from "../services/firebase";

import styles from '../styles/pages/Store.module.scss';

type UserProps = {
  name: string;
  email: string;
  password: string;
  cep: number;
  number: number;
  image: string;
  haveTelephone: boolean;
  haveGasStop: boolean;
  haveFoods: boolean;
}

type UserPropsPlusStoreId = {
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
}

const fadeUp = {
  initial: {
    opacity: 0,
    y: 100
  },
  animate: {
    opacity: 1,
    y: 0,
  }
}

export function Store() {

  const {
    user
  } = useUsers()

  const [Stores, setStores] = useState<UserPropsPlusStoreId[]>([]);

  useEffect(()=> {
    const roomRef = database.ref('stores');
    roomRef.on('value', room => {
      const StoresRoom = room.val();
      const StoresFormatted = [] as UserPropsPlusStoreId[]
      Object.entries(StoresRoom).forEach(([key, value]) => {
        const typeValue = value as UserProps;
        StoresFormatted.push({...typeValue, storeId:key});
      })
      setStores(StoresFormatted);
    })
    return () => {
      roomRef.off('value');
    }
  }, [])

  return(
    <motion.div>
      <Header userName={user?.name}/>
      <motion.div
        className={styles.container}
        animate={{
          transition: {
            staggerChildren: 0.5
          }
        }}
      >
        {Stores.map(store => (<>
        <Item
          {...store}
          sendto={"/store/:id/"}
          variants={fadeUp}
        />
        </>))}
      </motion.div>
    </motion.div>
  )
}