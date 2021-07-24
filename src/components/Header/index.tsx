import styled from './index.module.scss';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useUsers } from '../../contexts/UserContext';

import { Cart } from './Cart';
import { AddItemButton } from './AddItemButton';
import { useEffect, useState } from 'react';
import { database } from '../../services/firebase';

type HeaderProps = {
  userName: string;
  isStore?: boolean;
  StoreCallback?: () => void;
}

export function Header({
  userName,
  isStore = false,
  StoreCallback = () => {},
}:HeaderProps) {

  const {
    logout,
    userUid
  } = useUsers();

  const [cartItens, setCartItens] = useState(0)

  useEffect(() => {
    if(!userUid){
      return
    }
    
    database.ref("users").child(userUid).child("cart").on("value", (cart) => {
      let CartItensState = 0

      cart.forEach(item => {
        const quantity = item.val().quantity as string
        CartItensState += Number(quantity)
      });

      setCartItens(CartItensState)
    })
  },[userUid])

  return(
    <div className={styled.container}>
      <h1><RiLogoutBoxRLine onClick={logout}/>{userName && `Ola ${userName}`}</h1>
      {!isStore && <Cart itens={cartItens}/>}
      {isStore && <AddItemButton callback={StoreCallback}/>}
      
    </div>
  )
}