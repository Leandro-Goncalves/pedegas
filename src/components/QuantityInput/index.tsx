import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

import styles from './QuantityInput.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: Error;
  onPlus: () => void;
  onLess: () => void;
}

function ValueFormat(value:string) {
  const onlyNumbers = Number(value.replace(/[^0-9]/g, ''))
  return(`${onlyNumbers}`)
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({label, error, onPlus, onLess, ...rest}, ref) => {
  return(
    <label className={styles.container} htmlFor="input">
      <h1>{label}</h1>
      <div>
        <button
          style={{
            borderColor: error ? `var(--danger)` : `var(--green-dark)`
          }}
          type="button"
          onClick={onLess}
        ><RiSubtractLine/></button>
        <input
          id="input"
          {...rest}
          ref={ref}
          style={{
            borderColor: error ? `var(--danger)` : `var(--green-dark)`
          }}
          defaultValue={0}
          onChange={(e)=>{
            const { value } = e.target
            e.target.value = ValueFormat(value)
          }}
        />
        <button
          className={styles.right}
          style={{
            borderColor: error ? `var(--danger)` : `var(--green-dark)`
          }}
          type="button"
          onClick={onPlus}
        ><RiAddLine/></button>
      </div>
      {error && <h2>{error.message}</h2>}
    </label>
  )
}


export const QuantityInput = forwardRef(InputBase)