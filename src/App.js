
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { Button, message, Steps } from 'antd';
import { Form } from 'antd';
import React, { useState } from 'react';
import Email from './component/Email';
import MyPassword from './component/MyPassword';
const { Step } = Steps;
const steps = [
  {
    title: 'Nhập Email',
    content: <Email />,
  },
  {
    title: 'Nhập Password',
    content: <MyPassword />,
  },
  {
    title: 'Thông báo',
    content: 'Đăng nhập thành công. Click vào Done để hoàn thành đăng nhập.',
  },
];
const dbuser = [
  {
    email: 'demo1@email.com',
    password: 'demopass1'
  },
  {
    email: 'demo2@email.com',
    password: 'demopass2'
  },
  {
    email: 'demo3@email.com',
    password: 'demopass3'
  },
]
var myemail = '';
const App = () => {
  const [form] = Form.useForm();

  const checkLogin = (caselogin, email, pw) => {
    console.log(myemail)
    switch (caselogin) {
      case 'email':
        myemail = email;
        var checkemail = dbuser.findIndex(e => e.email === myemail);
        if (checkemail > -1) { 
          setCurrent(current + 1);
        } else {
          form.setFields([
            {
              name: 'email',
              errors: ['Không có email này.'],
            }
          ])
        }
        break;
      case 'pw':
        var index = dbuser.findIndex(e => e.email === email);
        var checkpass = dbuser[index].password === pw;
        if (checkpass == true) {
          setCurrent(current + 1);
        } else {
          form.setFields([
            {
              name: 'password',
              errors: ['Sai mật khẩu.'],
            }
          ])
        }
      default:
        break;
    }
  }
 
  const onFinish = (values) => {
    switch (current) {
      case 0:
        checkLogin('email', values.email)
        break;
      case 1:
        checkLogin('pw', myemail, values.password)
        break;
      default:
        break;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent(current - 1);
  };
  return (

    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" htmlType='submit'>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Hoàn thành đăng nhập.')}>
              Done
            </Button>
          )}
          {2 > current && current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div></Form>
    </>
  );
};


export default App;
