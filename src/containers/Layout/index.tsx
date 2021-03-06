import './index.scss'
import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import { Route } from 'react-router-dom'
import { Layout, Icon, Avatar } from 'antd'
import { routerList } from '@router/index'
import Menus from '@components/layout/Menus'
import menus from '@router/menus'
const { Header, Sider, Content } = Layout
class LayoutIndex extends ComponentExt<any, any> {
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
    const userinfo = this.$Storage._localStorage.get('userInfo') || {
      username: 'admin'
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          style={{ position: 'fixed', zIndex: 2, height: '100%' }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className='logo' />
          <Menus
            menus={menus}
            mode='inline'
            theme='dark'
            inlineCollapsed={this.state.collapsed}
            selectedKeys={[this.props.location.pathname]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: '#fff',
              paddingLeft: this.state.collapsed ? '80px' : '200px',
              position: 'fixed',
              width: '100%',
              zIndex: 1,
              boxShadow: '1px 1px 1px 1px #99999924'
            }}
          >
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Avatar
              style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}
              className='avatar'
            >
              {userinfo.username || 'admin'}
            </Avatar>
          </Header>
          <Content
            style={{
              margin: '85px 16px 24px 16px',
              overflow: 'initial',
              paddingLeft: this.state.collapsed ? '80px' : '200px'
            }}
          >
            <div style={{ padding: 24, background: '#fff' }}>
              {routerList.map(({ path, key, exact, component, ...props }) => (
                <Route
                  key={path}
                  path={path}
                  exact={exact || false}
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

// export default withRouter(LayoutIndex)
export default LayoutIndex
