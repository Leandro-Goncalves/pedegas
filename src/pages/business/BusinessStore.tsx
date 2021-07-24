import { useState } from "react";
import { AddItemModal } from "../../components/AddItemModal";
import { Header } from "../../components/Header";
import { useUsers } from "../../contexts/UserContext";

export function BusinessStore() {

  const {
    user,
    isStore
  } = useUsers()

  const [modal, setModal] = useState(false);
  

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
    </>
  )
}