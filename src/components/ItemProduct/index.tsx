import { useHistory } from 'react-router-dom';

import styles from './Item.module.scss';

type ItemProps = {
  name: string;
  value: number;
  image: string;
  productId: string;
  sendto?: string;
}


export function ItemProduct({
  name,
  image,
  value,
  productId,
  sendto
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
    <div className={styles.container} onClick={handleClick}>
      <img src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        <p>R$: {value.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
      </div>
    </div>
  )
}