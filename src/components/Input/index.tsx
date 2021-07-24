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
  return(
    <label className={styles.container}>
      <h1>{label}</h1>
      <input
        {...rest}
        ref={ref}
        style={{
          borderColor: error ? `var(--danger)` : `var(--green-dark)`
        }}
      />
      {error && <h2>{error.message}</h2>}
    </label>
  )
}

export const Input = forwardRef(InputBase)