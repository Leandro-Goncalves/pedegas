import { RiShoppingCart2Line } from 'react-icons/ri'
import { useHistory } from 'react-router-dom';
import styled from './Cart.module.scss';

type CartProps = {
  itens: number
}

export function Cart({itens}:CartProps) {

  const history = useHistory()

  function RedirectToCart() {
    history.push("/cart")
  }

  return (
    <button
      className={styled.container}
      onClick={RedirectToCart}
    >
      {itens > 0 && <div>{itens > 9 ? "+9" : itens}</div>}
      <RiShoppingCart2Line
        size={50}
        color={'var(--black-light)'}
      />
    </button>
  )
}