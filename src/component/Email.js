import { Form, Input } from 'antd';
import React from 'react';

const Email = () => {

  return (
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
  );
};

export default Email;