import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';

type PrivateRouteProps = RouteProps

export const PrivateRouteStore = ({...rest}:PrivateRouteProps) => {
  const {
    userUid,
    isStore
  } = useUsers()
    if(userUid){
      return (isStore ? <Route {...rest}/> : <Redirect to={{ pathname: "/store" }} />)
    }
    return (<Redirect to={{ pathname: "/" }} />);
};