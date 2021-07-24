import { ButtonHTMLAttributes } from "react"
import styles from './styles.module.scss';
import ClipLoader from "react-spinners/ClipLoader";


type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string,
  small?: boolean
  isLoading?: boolean,
  loadingColor?: string,
  loadingSize?: number
}

export function Button({
  small,
  text,
  isLoading,
  loadingColor = "black",
  loadingSize = 25,
  ...rest
}:ButtonPros) {
  return (
    <button className={small ? styles.smallButton : styles.button} {...rest}>
      {isLoading ? <ClipLoader color={loadingColor} loading size={loadingSize} /> : text}
    </button>
  )
}