import React, { useState } from "react";
import { Card, Form, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/slice/users";

import { AutoComplete } from "antd";
const { Option } = AutoComplete;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

type GrtUserProps = {
  onSelected: any;
};

const GetUser = (props: GrtUserProps) => {
  const { lastExistentResultsQuery: users } = useSelector((state: any) => {
    return state.users;
  });
  const dispatch = useDispatch();
  const handleSearch = (values: any) => {
    dispatch(userActions.getUsers(values.email));
  };

  return (
    <Form {...layout} name="basic">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your phone email"
          }
        ]}
      >
        <AutoComplete
          style={{
            width: 200
          }}
          onSearch={handleSearch}
          onChange={value => {
            const selected = users.find((e: any) => e.email === value);
            props.onSelected(selected);
          }}
          placeholder="Type your email"
        >
          {users.map((user: any, index: number) => (
            <Option key={`users_${index}`} value={user.email}>
              {user.name}
            </Option>
          ))}
        </AutoComplete>
      </Form.Item>
    </Form>
  );
};

const Welcome = () => {
  const [userData, setUserData] = useState<any>(null);
  return (
    <>
      <GetUser
        onSelected={(e: any) => {
          setUserData(e);
        }}
      />
      {userData && (
        <Row>
          <Col span={4} />
          <Col span={20}>
            <Card title={`Welcome Back, ${userData.name}`}>
              <Card type="inner">
                <div>Id: {userData.id}</div>
                <div>Address: {userData.address}</div>
                <div>Phone Number: {userData.phone}</div>
                <div>Email: {userData.email}</div>
              </Card>
            </Card>
          </Col>
        </Row>
      )}
      ,
    </>
  );
};

export default Welcome;
