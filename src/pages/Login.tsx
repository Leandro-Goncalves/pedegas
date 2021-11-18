import styles from "../styles/pages/Login.module.scss";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUsers } from "../contexts/UserContext";
import { toast } from "react-toastify";

type LoginFormData = {
  email: string;
  password: string;
};

const fadeUp = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

let LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("O Email não pode estar em branco")
    .email("Email invalido"),
  password: yup.string().required("A senha não pode estar em branco"),
});

export function Login() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { login } = useUsers();

  const handlerLogin: SubmitHandler<LoginFormData> = async (value) => {
    try {
      await login(value);
    } catch (err) {
      toast.error(err.message);
    }

    reset();
  };

  function handlerRegister() {
    history.push("/register");
  }

  return (
    <div className={styles.container}>
      <aside className={styles.lateralItens}>
        <div>
          <h1>Full Fuel</h1>
          <h3>abasteça com segurança</h3>
        </div>
        <img
          src="./img/unnamed2.png"
          alt="mulher entragando compras em uma moto"
        />
      </aside>
      <motion.div
        className={styles.content}
        initial="initial"
        animate="animate"
      >
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Login
        </motion.h1>
        <motion.form onSubmit={handleSubmit(handlerLogin)} variants={stagger}>
          <Input
            label="Email"
            type="text"
            {...register("email")}
            error={errors.email}
            animation={fadeUp}
          />
          <Input
            label="Senha"
            type="password"
            {...register("password")}
            error={errors.password}
            animation={fadeUp}
          />
          <Button
            type="submit"
            text="ENTRAR"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            loadingColor="white"
            variants={fadeUp}
          />
          <Button
            small
            type="button"
            text="Cadastrar"
            onClick={handlerRegister}
            variants={fadeUp}
          />
        </motion.form>
      </motion.div>
    </div>
  );
}
