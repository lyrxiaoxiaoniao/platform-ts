import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import {
  Form, Icon, Input, Button,
} from 'antd';
import './index.scss'

function hasErrors(fieldsError: Array<any>): boolean {
  return Object.keys(fieldsError).some((field: any) => fieldsError[field]);
}
class Login extends ComponentExt<any, any> {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.props.history.push('/app/home')
    });
  }
  // componentDidMount() {
  //   this.$Http.get('/login').then(res => {
  //     console.log(res)
  //   })
  // }
  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h2>admin platForm</h2>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Login
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const adminLogin = Form.create({ name: 'admin_login' })(Login);
export default adminLogin
