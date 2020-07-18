import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Row, Col, Button } from "antd";
import styles from "../../styles/index";
import NumberFormat from "react-number-format";

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (text: any) => <span>{text}</span>
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "uniPrice",
    render: (text: any) => (
      <NumberFormat
        value={text}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    )
  },
  {
    title: "Units",
    dataIndex: "units",
    key: "units"
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (text: any) => (
      <NumberFormat
        value={text}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    )
  }
];

const OrderSummary = () => {
  const history = useHistory();
  const { itemsInCart, totalPriceCart } = useSelector((state: any) => {
    return state.products;
  });

  const dataSource = itemsInCart.map((e: any) => {
    return {
      key: e.id,
      product: e.name,
      unitPrice: e.price,
      units: e.quantity,
      totalPrice: e.quantity * e.price
    };
  });

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
      <Row>
        <Col span={16} />
        <Col span={4}>
          <span style={styles.right}>Total</span>
        </Col>
        <Col span={4}>
          <div style={styles.right}>
            <NumberFormat
              value={totalPriceCart}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
          <div style={styles.right}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                history.push("/thanks");
              }}
            >
              Place Order!
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OrderSummary;
