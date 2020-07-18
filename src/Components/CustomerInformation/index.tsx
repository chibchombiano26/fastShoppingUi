import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { userActions } from "../../store/slice/users";

import WelcomeUser from "../WelcomeUser";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const NewUser = () => {
  return (
    <>
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input your Name"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Id"
        name="id"
        rules={[
          {
            required: true,
            message: "Please input your id"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your addess"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please input your phone number"
          }
        ]}
      >
        <Input />
      </Form.Item>

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
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

const CustomerInformation = () => {
  const [isAnExistentUser, setIsAnExistentUser] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    dispatch(userActions.addUser(values));
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item {...tailLayout} name="remember">
        <Checkbox onChange={() => setIsAnExistentUser(!isAnExistentUser)}>
          Are you an existent costumer
        </Checkbox>
      </Form.Item>

      {isAnExistentUser ? <WelcomeUser /> : <NewUser />}
    </Form>
  );
};

export default CustomerInformation;
