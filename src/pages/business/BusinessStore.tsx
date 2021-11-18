import { useEffect, useState } from "react";
import { AddItemModal } from "../../components/AddItemModal";
import { Header } from "../../components/Header";
import { useUsers } from "../../contexts/UserContext";
import { database } from "../../services/firebase";
import { RiArchiveLine, RiDraftLine } from 'react-icons/ri';

import styles from '../../styles/pages/business/BusinessStore.module.scss'
import { useHistory } from "react-router-dom";

type requests = {
  isFinished: boolean,
  name: string,
  payMethod: string,
  productId: string,
  quantity: number
  value: string
}


export function BusinessStore() {

  const history = useHistory();

  const {
    user,
    isStore,
    userUid
  } = useUsers()

  const [modal, setModal] = useState(false);
  const [request, setRequest] = useState<requests[]>([]);
  

  useEffect(()=>{
    async function loadData() {
      const requestsDatabase = await database.ref("requests").child(userUid).get()

      if(!requestsDatabase.val()){
        return
      }
      const requestsState = [] as requests[];

      Object.entries(requestsDatabase.val() as requests[]).map(([key, value]) => {
        requestsState.push(value)
      })

      setRequest(requestsState)
    }
    loadData()
  },[])
  

  return(
    <>
      <Header
        userName={user.name}
        isStore={isStore}
        StoreCallback={()=>{setModal(true)}}
      />
      <AddItemModal
        isOpen={modal}
        contentLabel="Add Item Modal"
        shouldCloseOnOverlayClick
        closeModal={()=>{setModal(false)}}
      />
      <div className={styles.container}>
        <button
          onClick={()=>{history.push('orders')}}
          className={styles.item}
          style={{backgroundColor: "var(--blue)"}}
        >
          <h1>Pedidos <RiDraftLine/></h1>
        </button>
        <button
          onClick={()=>{history.push('producs')}}
          className={styles.item}
          style={{backgroundColor: "var(--green-dark)"}}
        >
          <h1>Produtos <RiArchiveLine/></h1>
        </button>
      </div>
    </>
  )
}