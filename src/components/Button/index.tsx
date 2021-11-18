import styles from "./styles.module.scss";
import ClipLoader from "react-spinners/ClipLoader";
import { HTMLMotionProps, motion } from "framer-motion";

type ButtonPros = HTMLMotionProps<"button"> & {
  text: string;
  small?: boolean;
  isLoading?: boolean;
  loadingColor?: string;
  loadingSize?: number;
};

export function Button({
  small,
  text,
  isLoading,
  loadingColor = "black",
  loadingSize = 25,
  ...rest
}: ButtonPros) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      className={small ? styles.smallButton : styles.button}
      {...rest}
    >
      {isLoading ? (
        <ClipLoader color={loadingColor} loading size={loadingSize} />
      ) : (
        text
      )}
    </motion.button>
  );
}
