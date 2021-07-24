import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';

type PrivateRouteProps = RouteProps

export const PublicRoute = ({...rest}:PrivateRouteProps) => {
  const {
    userUid,
    isStore
  } = useUsers()
    if(userUid){
      return (isStore ? <Redirect to={{ pathname: "/business/store" }} /> : <Redirect to={{ pathname: "/store" }} />)
    }
    return (<Route {...rest}/>);
};