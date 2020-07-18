import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useHistory } from "react-router-dom";
import styles from "../../..//src/styles/index";

import { Typography } from "antd";

const { Title } = Typography;

type HeadeProps = {
  showCart: boolean;
};

const Header = (props: HeadeProps) => {
  const history = useHistory();
  const { itemsInCart } = useSelector((state: any) => {
    return state.products;
  });

  return (
    <>
      <Row>
        <Col span={1} />
        <Col span={2} style={styles.headerLogo}>
          <img
            alt="logo"
            style={styles.header}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/1024px-Cc.logo.circle.svg.png"
          />
        </Col>
        <Col span={8}>
          <Title level={3}>Fast Shopping</Title>
        </Col>
        <Col offset={12} style={styles.center}>
          {props.showCart && (
            <Badge count={itemsInCart.length}>
              <ShoppingCartOutlined
                style={{ fontSize: "24px", color: "#08c" }}
                onClick={() => {
                  history.push("/list");
                }}
              />
            </Badge>
          )}
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default Header;
