import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useUsers } from "../contexts/UserContext";

type PrivateRouteProps = RouteProps;

export const PrivateRoute = ({ ...rest }: PrivateRouteProps) => {
  const { userUid, isStore } = useUsers();
  if (userUid) {
    return isStore ? (
      <Redirect to={{ pathname: "/business/store" }} />
    ) : (
      <Route {...rest} />
    );
  }
  return <Redirect to={{ pathname: "/" }} />;
};
