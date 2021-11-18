import { motion, Variants} from "framer-motion";
import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react"

import styles from './styles.module.scss';

type Error = {
  message: string;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: Error;
  animation?: Variants;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({label, error, animation, ...rest}, ref) => {
  return(
    <motion.label className={styles.container} variants={animation}>
      <h1>{label}</h1>
      <input
        {...rest}
        ref={ref}
        style={{
          borderColor: error ? `var(--danger)` : `var(--green-dark)`
        }}
      />
      {error && <h2>{error.message}</h2>}
    </motion.label>
  )
}

export const Input = forwardRef(InputBase)