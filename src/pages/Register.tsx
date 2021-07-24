import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';

import { RiUserLine, RiStoreLine } from 'react-icons/ri'

import styles from '../styles/pages/Register.module.scss';
import { useUsers } from '../contexts/UserContext';
import { StoreModal } from '../components/StoreModal';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cep: number;
  number: number;
}

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

type UserData = {
  name: string;
  email: string;
  password: string;
  cep: number;
  number: number
}

let RegisterSchema = yup.object().shape({
  name: yup.string().required("O Nome não pode estar em branco"),
  email: yup.string().required("O Email não pode estar em branco").email("Email invalido"),
  password: yup.string().required("A senha não pode estar em branco"),
  confirmPassword: yup.string().required("A confirmação de senha não pode estar em branco")
  .oneOf([yup.ref('password'), null], 'As senhas nao batem'),
  cep: yup.number().required("O CEP não pode estar em branco").typeError("cep invalido"),
  number: yup.number().required("O numero não pode estar em branco").typeError("numero invalido"),
});

export function Register() {

  const history = useHistory();
  const [switchValue, setSwitchValue] = useState(false);
  const [modal, setModal] = useState(false);
  const [savedUserData, setSavedUserData] = useState<UserData>({} as UserData);
  

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(RegisterSchema)
  });

  const {
    register:UserRegister,
    UserStoreRegister
  } = useUsers()

  const handlerRegister: SubmitHandler<RegisterFormData> = async (value) => {
    if(switchValue){
      setModal(true)
      setSavedUserData(value)
      return;
    }
    await UserRegister(value)
  }

  const handlerStoreRegister= async (userData: UserStoreData) => {
    setModal(false)
    await UserStoreRegister(userData)
  }

  function handleLogin() {
    history.push("/")
  }

  return(
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Cadastrar</h1>
        <div className={styles.switch}>
        <Switch
          onChange={setSwitchValue}
          checked={switchValue}
          onColor={"#39a48a"}
          uncheckedIcon={
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
              <RiUserLine color={"white"} size={20}/>
            </div>
          }
          checkedIcon={
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
              <RiStoreLine color={"white"} size={20}/>
            </div>
          }
        />
        </div>
        <form onSubmit={handleSubmit(handlerRegister)}>
          <Input
            label="Nome"
            type="text"
            {...register("name")}
            error={errors.name}
          />
          <Input
            label="Email"
            type="text"
            {...register("email")}
            error={errors.email}
          />
          <Input
            label="Senha"
            type="password"
            {...register("password")}
            error={errors.password}
          />
          <Input
            label="Confirmar senha"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
          />
          <Input
            label="Cep"
            type="number"
            {...register("cep")}
            error={errors.cep}
          />
          <Input
            label="Numero"
            type="number"
            {...register("number")}
            error={errors.number}
          />
          <div>
            <Button
              type="submit"
              text="CADASTRAR"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              loadingColor="white"
            />
            <Button small type="button" text="Logar" onClick={handleLogin}/>
          </div>
        </form>
      </div>
      <StoreModal
        isOpen={modal}
        closeModal={()=>setModal(false)}
        contentLabel="Store Modal"
        shouldCloseOnOverlayClick
        userData={savedUserData}
        callback={handlerStoreRegister}
      />
    </div>
  )
}