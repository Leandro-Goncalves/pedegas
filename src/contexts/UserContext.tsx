import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { auth, firebase, database } from "../services/firebase";
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

type User = {
  cep: number;
  email: string;
  name: string;
  number: number;
  isStore?: boolean;
  cart: any
}

type loginProps = {
  email: string;
  password: string;
}

type registerProps = {
  name: string;
  email: string;
  password: string;
  cep: number;
  number: number;
}

type registerUserProps = {
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

interface UserContextData {
  userUid: string;
  user: User;
  isStore: boolean;
  login: (userInformation:loginProps) => Promise<void>;
  register: (userInformation:registerProps) => Promise<void>;
  UserStoreRegister: (userInformation:registerUserProps) => Promise<void>;
  logout: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}


export const UserContext = createContext({} as UserContextData);

export function UserProvider({
  children,
}: UserProviderProps) {

  const history = useHistory();

  const [user, setUser] = useState<User>({} as User);
  
  const [userUid, setUserUid, removeUserUid] = useCookies(['@pedegas_uid'])
  const [isStore, setIsStore, removeIsStore] = useCookies(['@pedegas_isStore'])
  
  const loadUserData = useCallback(async (uid:string) => {
    const data = await (await database.ref('users').child(uid).get()).val();
    if(!data) {
      const dataStore = await database.ref('stores').child(uid).get();
      if(dataStore.val()){
        setUser({...dataStore.val(), isStore: true})
        setIsStore('@pedegas_isStore', true, { path: '/' });
        setUserUid('@pedegas_uid', uid, { path: '/' });
        return
      }
      setUserUid('@pedegas_uid', uid, { path: '/' });
    }
    setUser(data)
    setIsStore('@pedegas_isStore', false, { path: '/' });
  },[setIsStore, setUserUid])

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { uid } = user;
        loadUserData(uid)
      }
    })
    return () => {
      unsubscribe();
    }
  },[loadUserData, setUserUid])

  async function login({ email, password }:loginProps) {
    try{
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
      if(user) {
        const { uid } = user;
        const isBussines = await database.ref('stores').child(uid).get()
        if(isBussines.val()){
          setIsStore('@pedegas_isStore', true, { path: '/' });
        }
        setUserUid('@pedegas_uid', uid, { path: '/' });
      }
    } catch(err) {
      
    }
  }

  async function register({
    name,
    email,
    password,
    cep,
    number,
  }:registerProps) {
    try{
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
      if(user) {
        const { uid } = user;
        await database.ref('users').child(uid).set({name, cep, number, email});
        setUserUid('@pedegas_uid', uid, { path: '/' });
        setIsStore('@pedegas_isStore', false, { path: '/' });
      }
    } catch(err) {
      console.log(err)
    }
  }

  async function UserStoreRegister(Props:registerUserProps) {
    try{
      const { user } = await firebase.auth().createUserWithEmailAndPassword(Props.email, Props.password)
      if(user) {
        const { uid } = user;
        await database.ref('stores').child(uid).set(Props);
        setUserUid('@pedegas_uid', uid, { path: '/' });
        setIsStore('@pedegas_isStore', true, { path: '/' });
      }
    } catch(err) {
      console.log(err)
    }
  }

  async function logout() {
    await firebase.auth().signOut()
    removeUserUid('@pedegas_uid')
    removeIsStore('@pedegas_isStore')
    history.push("/")
  }

  return(
    <UserContext.Provider
    value={{
      userUid:userUid['@pedegas_uid'],
      user,
      login,
      register,
      UserStoreRegister,
      logout,
      isStore:isStore['@pedegas_isStore'] === "true",
    }}
    >
      {children}
    </UserContext.Provider>
  )
};

export const useUsers = () => {
  return useContext(UserContext)
}