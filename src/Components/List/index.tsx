import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { productActions } from '../../../src/store/slice/products';
import { List, Row, Col, Button } from "antd";
import { Typography } from "antd";

const { Paragraph } = Typography;

type ElementProps ={
  item: any,
  onnAddCart : (item:any) => void
}

const Element = (props:ElementProps) => {
  const {item, onnAddCart} = props;
  return (<>
  <Row>
    <Col span={8}>
      <img
        alt={item.id}
        src={`https://picsum.photos/100/100?random=${item.id}`}
      />
    </Col>
    <Col offset={2} span={14}>
      <Row>
        <Col>
        <div style={{fontSize: 12, fontWeight: 'bold'}}>{item.name}</div>
        <div>
          Product Category: {item.category?.join(", ")}
        </div>
        <div>
          <Paragraph ellipsis>{item.description}</Paragraph>
        </div>
        <div>
          <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </div>
      </Col>
      <Col style={{alignSelf: 'flex-end'}}>
      <Button type="primary" onClick={() => onnAddCart(item)} size="small">
        Add to Cart
      </Button>
      </Col>
      </Row>
    </Col>
  </Row>
  </>)
};

const ListComponent = () => {
  const {products:data} = useSelector((state:any) => {
    return state.products;
  })
  const dispatch = useDispatch();
  
  return (
    <List
      grid={{
        gutter: 24,
        column: 2,
      }}
      pagination={{
        defaultPageSize: 20
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Element item={item} onnAddCart={(item)=>{
            dispatch(productActions.addToCart(item))
          }} />
        </List.Item>
      )}
    />
  );
};

export default ListComponent;
