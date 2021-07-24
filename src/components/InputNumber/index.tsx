import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react"

import styles from './styles.module.scss';

type Error = {
  message: string;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: Error;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({label, error, ...rest}, ref) => {

  function ValueFormat(value:string) {
    const valueWithOnlyNumbers = value.replace(/[^0-9]/g, '')
    const valueInt = valueWithOnlyNumbers.substr(0, valueWithOnlyNumbers.length - 2)
    const valueFloat = valueWithOnlyNumbers.substr(valueWithOnlyNumbers.length - 2, valueWithOnlyNumbers.length).padStart(2, "0");
    const valueNumber = Number(`${valueInt}.${valueFloat}`)
    return(`R$: ${valueNumber.toLocaleString('pt-br', {minimumFractionDigits: 2})}`);
  }

  return(
    <label className={styles.container}>
      <h1>{label}</h1>
      <input
        {...rest}
        ref={ref}
        style={{
          borderColor: error ? `var(--danger)` : `var(--green-dark)`
        }}
        onChange={(e)=>{
          const { value } = e.target
          e.target.value = ValueFormat(value)
        }}
      />
      {error && <h2>{error.message}</h2>}
    </label>
  )
}

export const InputNumber = forwardRef(InputBase)