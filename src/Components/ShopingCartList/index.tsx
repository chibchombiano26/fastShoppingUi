import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productActions } from "../../store/slice/products";
import { List, Row, Col, Button, Select } from "antd";
import { useSelector } from "react-redux";
import styles from "../../styles/index";
import NumberFormat from "react-number-format";

const { Option } = Select;

type QuantityProps = {
  quantity: number;
  item: any;
};

const Quantity = (props: QuantityProps) => {
  const dispatch = useDispatch();
  const { quantity, item } = props;
  const options = Array.from(Array(21).keys()).map((_, index) => (
    <Option key={`quantity_${index}`} value={index + 1}>
      {index + 1}
    </Option>
  ));

  return (
    <Select
      defaultValue={quantity}
      onChange={e => {
        dispatch(productActions.changeQuantity({ ...item, newQuantity: e }));
      }}
      style={{ minWidth: 60 }}
    >
      {options}
    </Select>
  );
};

const Element = (props: any) => {
  const { item } = props;
  return (
    <List.Item key={item.title}>
      <List.Item.Meta
        avatar={
          <img
            alt={item.id}
            src={`https://picsum.photos/100/100?random=${item.id}`}
          />
        }
        title={<span>{item.name}</span>}
        description={
          <Row>
            <Col span={8}>
              <div>Last Price</div>
              <div>
                <NumberFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </div>
            </Col>
            <Col span={8}>
              <div>QTY</div>
              <div>
                <Quantity item={item} quantity={item.quantity} />
              </div>
            </Col>
            <Col span={8}>
              <NumberFormat
                value={item.price * item.quantity}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Col>
          </Row>
        }
      />
    </List.Item>
  );
};

type FooterProps = {
  totalPriceCart: number;
};

const Footer = (props: FooterProps) => {
  const history = useHistory();
  return (
    <Row>
      <Col span={16}>
        <Button
          type="link"
          onClick={() => {
            history.push("/products");
          }}
        >
          Continues Shopping
        </Button>
      </Col>
      <Col span={4}>
        <span style={styles.right}>Total</span>
      </Col>
      <Col span={4}>
        <div style={styles.right}>
          <NumberFormat
            value={props.totalPriceCart}
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
              history.push("/summary");
            }}
          >
            Check Out!
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const ShoppingCartList = () => {
  const { itemsInCart, totalPriceCart } = useSelector((state: any) => {
    return state.products;
  });

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }}
      dataSource={itemsInCart}
      footer={<Footer totalPriceCart={totalPriceCart} />}
      renderItem={(item: any) => <Element item={item} />}
    />
  );
};

export default ShoppingCartList;
