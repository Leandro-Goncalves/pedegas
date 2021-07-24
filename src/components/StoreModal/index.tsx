import { useState } from 'react';
import Modal, {Props} from 'react-modal';
import styles from './StoreModal.module.scss';
import Switch from 'react-switch';
import { RiPhoneLine, RiGasStationLine, RiCloseLine } from 'react-icons/ri'
import { GiKnifeFork } from 'react-icons/gi'
import { Button } from '../Button';

type UserData = {
  name: string;
  email: string;
  password: string;
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

type StoreModalProps = Props & {
  userData: UserData
  callback: (userData: UserStoreData) => Promise<void>
  closeModal: () => void
}

export function StoreModal({
  closeModal,
  callback,
  userData,
  ...props
}:StoreModalProps) {
  Modal.setAppElement('#root');

  const [haveTelephone, setHaveTelephone] = useState(false);
  const [haveGasStop, setHaveGasStop] = useState(false);
  const [haveFoods, setHaveFoods] = useState(false);
  
  const [imageBase64, setImageBase64] = useState('');
  
  
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

  function handleRegister() {
    const userStoreData = {
      ...userData,
      image:imageBase64,
      haveTelephone,
      haveGasStop,
      haveFoods
    }
    callback(userStoreData)
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
      <label>
        <input
          accept="image/png, image/gif, image/jpeg"
          type="file"
          onChange={(e) => SaveImage(e.target.files)}
        />
        {imageBase64 && <img src={imageBase64} alt="Select Store" className={styles.image}/>}
      </label>
      <nav>
        <div>
          <Switch
            onChange={setHaveTelephone}
            checked={haveTelephone}
            offColor={"#ec6262"}
            onColor={"#39a48a"}
          />
          <RiPhoneLine color={"var(--black-light)"} size={60}/>
        </div>
        <div>
          <Switch
            onChange={setHaveGasStop}
            checked={haveGasStop}
            offColor={"#ec6262"}
            onColor={"#39a48a"}
          />
          <RiGasStationLine color={"var(--black-light)"} size={60}/>
        </div>
        <div>
          <Switch
            onChange={setHaveFoods}
            checked={haveFoods}
            offColor={"#ec6262"}
            onColor={"#39a48a"}
          />
          <GiKnifeFork color={"var(--black-light)"} size={60}/>
        </div>
      </nav>
      <Button text="Cadastrar" small onClick={handleRegister}/>
    </Modal>
  )
}