import { Form, Input } from 'antd';
import React from 'react';

const MyPassword = () => {


  return (
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
  );
};

export default MyPassword;