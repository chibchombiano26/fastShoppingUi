import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import styles from "./styles/index";

import store, { persistor } from "../src/store/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductList from "./Screens/ProductList";
import ShopingCartList from "./Screens/ShopingCart";
import OrdenSummary from "./Screens/OrdenSummary";
import Thanks from "./Screens/Thanks";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App" style={styles.app}>
          <Router>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route path="/products" component={ProductList} />
              <Route path="/list" component={ShopingCartList} />
              <Route path="/summary" component={OrdenSummary} />
              <Route path="/thanks" component={Thanks} />
            </Switch>
          </Router>
        </div>
      </PersistGate>
    </ReduxProvider>
  );
}
