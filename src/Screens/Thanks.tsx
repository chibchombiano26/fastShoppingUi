import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { productActions } from "../store/slice/products";
import Lottie from "lottie-react-web";
import Styles from "../styles/index";
import Success from "../Json/9917-success.json";
import { Typography } from "antd";

const { Title } = Typography;

const Thanks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Row>
      <Col offset={8}>
        <div style={Styles.textCenter}>
          <Title level={2}>Success</Title>
        </div>
        <Lottie
          options={{
            animationData: Success,
            loop: false
          }}
          width={300}
        />

        <div style={Styles.textCenter}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              dispatch(productActions.clean());
              history.push("/products");
            }}
          >
            Start Again
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Thanks;
