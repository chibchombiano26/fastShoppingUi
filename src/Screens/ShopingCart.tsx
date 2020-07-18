import React from "react";

import Header from "../Components/Header";
import List from "../Components/ShopingCartList";

const ShopingList = () => {
  return (
    <>
      <Header showCart={false} />
      <List />
    </>
  );
};

export default ShopingList;
