import { RiCloseCircleLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

import styles from './Item.module.scss';

type ItemProps = {
  name: string;
  value: number;
  image: string;
  productId: string;
  quantity: number;
  sendto?: string;
  noAnimation?: boolean;
  removeCallback?: (productId:string) => void;
}


export function ItemProduct({
  name,
  image,
  value,
  productId,
  sendto,
  noAnimation,
  removeCallback
}:ItemProps) {

  const history = useHistory()

  function handleClick() {
    if(!sendto){
      return
    }
    const pathToSend = sendto.replace(":id",productId)
    history.push(pathToSend)
  }

  return(
    <div
      className={`${styles.container} ${noAnimation && styles.noAnimation}`}
      onClick={handleClick}
    >
      {removeCallback &&
        <button onClick={()=>removeCallback(productId)}><RiCloseCircleLine/></button>
      }
      <img src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        <p>R$: {value.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
      </div>
    </div>
  )
}