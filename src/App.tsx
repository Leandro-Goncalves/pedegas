import { Switch, useLocation } from 'react-router-dom'

import { UserProvider } from './contexts/UserContext';
import { CookiesProvider } from 'react-cookie';

import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRouteStore } from './routes/PrivateRouteStore';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Store } from './pages/Store';
import { StoreSelected } from './pages/StoreSelected';

import { BusinessStore } from './pages/business/BusinessStore';
import { Item } from './pages/Item';
import { Cart } from './pages/Cart';
import { Orders } from './pages/business/Orders';
import Products from './pages/business/Products';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <AnimatePresence>
          <Switch>
              <PublicRoute exact path="/" component={Login}/>
              <PublicRoute path="/register" component={Register}/>
              <PrivateRoute path="/store/:id/:productId" component={Item}/>
              <PrivateRoute path="/store/:id" component={StoreSelected}/>
              <PrivateRoute path="/store" component={Store}/>
              <PrivateRoute path="/cart" component={Cart}/>
              <PrivateRouteStore path="/business/store" component={BusinessStore}/>
              <PrivateRouteStore path="/business/orders" component={Orders}/>
              <PrivateRouteStore path="/business/producs" component={Products}/>
          </Switch>
        </AnimatePresence>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
