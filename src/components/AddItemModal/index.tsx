import { useState } from 'react';
import Modal, {Props} from 'react-modal';
import styles from './AddItemModal.module.scss';
import { Button } from '../Button';
import { Input } from '../Input';
import { InputNumber } from '../InputNumber';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { database } from '../../services/firebase';
import { useUsers } from '../../contexts/UserContext';
import { QuantityInput } from '../QuantityInput';
import { RiCloseLine } from 'react-icons/ri';

type UserStoreData = {
  name: string;
  email: string;
  password: string;
  cep: number;
  number: number;
  image: string;
  haveTelephone: boolean;
  haveGasStop: boolean;
  haveFoods: boolean;
}

type StoreModalProps = Props & {
  closeModal: () => void
}

type AddItemModalFormData = {
  name: string;
  value: string;
  quantity: number;
} 

let AddItemSchema = yup.object().shape({
  name: yup.string().required("O Nome não pode estar em branco"),
  value: yup.string().matches(/^(?:(?!R\$: 0,00).)*$/g, "O valor precisa ser maior que zero"),
  quantity: yup.string().matches(/^(?:(?!0).)*$/g, "A quantidade precisa ser maior que zero"),
});

export function AddItemModal({
  closeModal,
  ...props
}:StoreModalProps) {
  Modal.setAppElement('#root');
  const [imageBase64, setImageBase64] = useState('');

  const {
    userUid
  } = useUsers()

  const { register, handleSubmit, getValues, setValue, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(AddItemSchema)
  });

  function unFormatedValue(value: string) {
    return Number(value.replace(/[^0-9,]/g, '').replace(",", "."))
  }

  const handlerAddItem: SubmitHandler<AddItemModalFormData> = async (value) => {
    if(!imageBase64){
      return
    }
    const data = {...value, image: imageBase64, value: unFormatedValue(value.value)}

    await database.ref("stores").child(userUid).child("itens").push(data);
    reset()
    setImageBase64("")
    closeModal()
  }
  
  
  function fileToBase64(file:File, callback: (imageBase64:string) => void) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if(typeof(reader.result) !== "string"){
        return
      }
      callback(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  async function SaveImage(files:FileList | null) {
    if(!files){
      return
    }
    fileToBase64(files[0], setImageBase64)
  }

  function addOrSubstractValue(type: string) {

    const value = Number(getValues("quantity"))
    if(value === 0 && type !== "add"){
      return;
    }
    setValue("quantity", type === "add" ? value + 1 : value - 1)
  }

  return(
    <Modal overlayClassName={styles.overlay} className={styles.content} {...props}>
      <button
        className={styles.close}
        onClick={closeModal}
      >
        <RiCloseLine/>
      </button>
      <h1>Selecione a imagem</h1>
      <label
        className={styles.ImageInput}
        style={{border: `2px solid var(${imageBase64 ? "--green-dark" : "--danger"})`}}
      >
        <input
          accept="image/png, image/gif, image/jpeg"
          type="file"
          onChange={(e) => SaveImage(e.target.files)}
        />
        {imageBase64 && <img src={imageBase64} alt="Select Store" className={styles.image}/>}
      </label>
      <form onSubmit={handleSubmit(handlerAddItem)}>
        <Input
          label="Nome"
          type="text"
          {...register("name")}
          error={errors.name}
        />
        <InputNumber
          label="Valor"
          inputMode="numeric"
          defaultValue="R$: 0,00"
          {...register("value")}
          error={errors.value}
        />
        <QuantityInput
          label="Quantidade"
          inputMode="numeric"
          {...register("quantity")}
          onPlus={()=>{addOrSubstractValue("add")}}
          onLess={()=>{addOrSubstractValue("substract")}}
          error={errors.quantity}
        />
        <Button text="Cadastrar Item" small isLoading={isSubmitting} loadingColor="white"/>
      </form>
    </Modal>
  )
}