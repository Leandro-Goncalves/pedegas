import styles from '../styles/pages/Login.module.scss';
import onTheWayImg from '../assets/onTheWay.svg';
import { useHistory } from 'react-router-dom';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { useUsers } from '../contexts/UserContext';

type LoginFormData = {
  email: string;
  password: string;
}  

let LoginSchema = yup.object().shape({
  email: yup.string().required("O Email não pode estar em branco").email("Email invalido"),
  password: yup.string().required("A senha não pode estar em branco"),
});

export function Login() {

  const history = useHistory();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(LoginSchema)
  });

  const {
    login,
  } = useUsers()

  const handlerLogin: SubmitHandler<LoginFormData> = async (value) => {
    await login(value)
    reset()
  }

  function handlerRegister() {
    history.push("/register")
  }

  return(
    <div className={styles.container}>
      <aside className={styles.lateralItens}>
        <h1>pedegás</h1>
        <img src={onTheWayImg} alt="mulher entragando compras em uma moto" />
      </aside>
      <div className={styles.content}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(handlerLogin)}>
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
          <Button
            type="submit"
            text="ENTRAR"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            loadingColor="white"
          />
          <Button small type="button" text="Cadastrar" onClick={handlerRegister}/>
        </form>
      </div>
    </div>
  )
}