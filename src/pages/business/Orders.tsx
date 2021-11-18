import { useEffect, useState } from "react";
import { Header } from "../../components/Header"
import { Itens } from "../../components/OrdersItens";
import { OrdersModal } from "../../components/OrdersModal";
import { useUsers } from "../../contexts/UserContext"
import { database } from "../../services/firebase";

import styles from '../../styles/pages/business/Orders.module.scss'

type userInformation = {
  cep: number;
  name: string;
  number: number;
}

export type requests = {
  isFinished: boolean,
  name: string,
  payMethod: "money" | "bankCard",
  productId: string,
  requestId: string,
  quantity: number,
  value: number,
  userInformation: userInformation
}

export function Orders() {

  const {
    user,
    isStore,
    userUid
  } = useUsers()

  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState<requests[]>([]);
  const [itemSelected, setItemSelected] = useState<requests | null>(null);


  useEffect(() => {
    database.ref("requests").child(userUid).on("value",(response)=>{
      
      if(!response.val()){
        return
      }
      const requestsState = [] as any

      Object.entries(response.val()).forEach(
        ([key, value]) => {
          const valueType = value as requests
          requestsState.push({...valueType, requestId:key})
        }
      )
      setRequests(requestsState)

    })
  },[userUid])

  async function delivered(id:string){
    setIsOpen(false);
    database.ref("requests")
    .child(userUid).child(id).child("isFinished").set(true)
  }

  return(
    <>
     <Header
        userName={user.name}
        isStore={isStore}
        isRightItem={false}
      />
      <div className={styles.container}>
        <Itens
          requests={requests}
          callback={(data)=>{
            if(!data.isFinished){
              setItemSelected(data);
              setIsOpen(true)
            }
          }}
        />
      </div>
      <OrdersModal
        isOpen={isOpen}
        Itendata={itemSelected}
        closeModal={()=>setIsOpen(false)}
        callback={delivered}
      />
    </>
  )
}