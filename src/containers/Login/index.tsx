import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import {
  Form, Icon, Input, Button
} from 'antd';
import './index.scss'
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react'

interface IStoreProps extends IStore {}
export interface fileds extends IUserStore.IUser{
  [key: string]: any
}
function hasErrors(fieldsError: fileds): boolean {
  return Object.keys(fieldsError).some((field: string|any) => fieldsError[field]);
}
@inject('userStore')
@observer
class Login extends ComponentExt<FormComponentProps & IStoreProps, any> {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.userStore.loginIn(values)
      }
      // this.props.history.push('/app/home')
    });
  }
  render() {
    console.log(this.props.userStore)
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h2>admin platForm</h2>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('username', {
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
const adminLogin = Form.create()(Login);
export default adminLogin
