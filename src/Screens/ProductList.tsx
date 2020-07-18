import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../Components/Header";
import List from "../Components/List";
import { productActions } from "../store/slice/products";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      dispatch(productActions.getProducts());
    };
    init();
  });

  return (
    <div className="App">
      <Header showCart={true} />
      <List />
    </div>
  );
}
