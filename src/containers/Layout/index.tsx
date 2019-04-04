import './index.scss'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { routerList } from '@router/index'
const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
class LayoutIndex extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  
  render() {
    console.log(routerList, '11111')
    return (
      <Layout>
        <Sider style={{ position: 'fixed', zIndex:1,height: '100%'}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className='logo' />
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='dark'
            inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key='1' title={this.state.collapsed ? 'Option 1' : ''}>
              <Icon type='pie-chart' />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='desktop' />
              <span>Option 2</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='inbox' />
              <span>Option 3</span>
            </Menu.Item>
            <SubMenu
              key='sub1'
              title={
                <span>
                  <Icon type='mail' />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key='5'>Option 5</Menu.Item>
              <Menu.Item key='6'>Option 6</Menu.Item>
              <Menu.Item key='7'>Option 7</Menu.Item>
              <Menu.Item key='8'>Option 8</Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub2'
              title={
                <span>
                  <Icon type='appstore' />
                  <span>Navigation Two</span>
                </span>
              }
            >
              <Menu.Item key='9'>Option 9</Menu.Item>
              <Menu.Item key='10'>Option 10</Menu.Item>
              <SubMenu key='sub3' title='Submenu'>
                <Menu.Item key='11'>Option 11</Menu.Item>
                <Menu.Item key='12'>Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', paddingLeft: (this.state.collapsed) ? '80px':'200px',position: 'fixed', width: '100%' }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{margin: '85px 16px 24px 16px',overflow: 'initial', paddingLeft: (this.state.collapsed) ? '80px':'200px'}}
          >
           <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              {routerList.map(({ path, key, exact, component, ...props }) => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={component}
                  {...props}
                />
              ))}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default LayoutIndex
