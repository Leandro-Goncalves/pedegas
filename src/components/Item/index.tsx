import { RiPhoneLine, RiGasStationLine } from 'react-icons/ri'
import { GiKnifeFork } from 'react-icons/gi';

import { useHistory } from 'react-router-dom';

import styles from './Item.module.scss';

type ItemProps = {
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
  sendto?: string
}


export function Item({
  image,
  name,
  haveFoods,
  haveGasStop,
  haveTelephone,
  storeId,
  sendto
}:ItemProps) {

  const history = useHistory()

  function handleClick() {
    if(!sendto){
      return
    }
    const pathToSend = sendto.replace(":id",storeId)
    history.push(pathToSend)
  }

  return(
    <div className={styles.container} onClick={handleClick}>
      <img src={image} alt={name} />
      <div>
        <h1>Posto {name}</h1>
        <nav>
          <RiPhoneLine size={40}
            color={haveTelephone?`var(--green-light)` : `var(--black-light)`}
            style={{opacity: haveTelephone ? 1 : 0.3}}
          />

          <RiGasStationLine size={40}
            color={`var(${haveGasStop ? "--green-light" : "--black-light)"}`}
            style={{opacity: haveGasStop ? 1 : 0.3}}
          />

          <GiKnifeFork size={40}
            color={`var(${haveFoods ? "--green-light" : "--black-light)"}`}
            style={{opacity: haveFoods ? 1 : 0.3}}
          />
        </nav>
      </div>
    </div>
  )
}