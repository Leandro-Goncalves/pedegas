import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, RefObject, useEffect, useState } from 'react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

import styles from './QuantityProductInput.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  maxQuantity: number
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({maxQuantity, ...rest}, ref) => {
  
  const [value, setValue] = useState(0);
  
  function decrementQuantity() {
    if(value === 0){
      return
    }
    setValue(value -1)
  }

  function incrementQuantity() {
    if(value >= maxQuantity){
      return
    }
    setValue(value + 1)
  }

  useEffect(() => {
    if(value > maxQuantity){
      setValue(maxQuantity)
    }
  },[maxQuantity])

  return(
      <div className={styles.container}>
        <button
          type="button"
          onClick={decrementQuantity}
        ><RiSubtractLine/></button>
        <input
          id="input"
          {...rest}
          ref={ref}
          value={value}
          onChange={(e)=>{
            const value = Number(e.target.value)
            setValue(value >= maxQuantity ? maxQuantity : value)
          }}
        />
        <button
          className={styles.right}
          type="button"
          onClick={incrementQuantity}
        ><RiAddLine/></button>
      </div>
  )
}

export const QuantityProductInput = forwardRef(InputBase)