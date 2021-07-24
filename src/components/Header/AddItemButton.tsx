
import {RiAddLine} from 'react-icons/ri'

import styles from './AddItemButton.module.scss';

type AddItemButtonProps = {
  callback: () => void;
}

export function AddItemButton({ callback }: AddItemButtonProps) {
  return(
    <button className={styles.container} onClick={callback}>
      <RiAddLine/>
    </button>
  )
}