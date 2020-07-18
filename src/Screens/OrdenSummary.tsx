import * as React from "react";
import { Row, Col } from "antd";
import Header from "../Components/Header";
import CustomerInformation from "../Components/CustomerInformation";
import OrderSummary from "../Components/OrderSummary";

export default function App() {
  return (
    <div className="App">
      <Header showCart={false} />
      <Row>
        <Col span={10}>
          <CustomerInformation />
        </Col>
        <Col span={2} />
        <Col span={12}>
          <OrderSummary />
        </Col>
      </Row>
    </div>
  );
}
