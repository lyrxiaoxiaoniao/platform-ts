import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu
export interface Iprops {
    child?: Array<Iprops>
    [propName: string]: any
}

const renderMenuItem = ({ key, title, icon, link, ...props }: Iprops) => {
    return (<Menu.Item
        key={key || link}
        {...props}
    >
        <Link to={link || key}>
            {icon && <Icon type={icon} />}
            <span>{title}</span>
        </Link>
    </Menu.Item>)
}


const renderSubMenu =
    ({ key, title, icon, link, child, ...props }: Iprops) => {
        return (
            <SubMenu
                key={key || link}
                title={
                    <span>
                        {icon && <Icon type={icon} />}
                        <span>{title}</span>
                    </span>
                }
                {...props}
            >
                {child && child.map((item: Iprops) => renderMenuItem(item))}
            </SubMenu>
        )
    }

export default ({ menus, ...props }: Iprops) => {
    return (
        <Menu {...props} defaultSelectedKeys={[menus[0].key]} defaultOpenKeys={[menus[0].key]}>
            {menus && menus.map(
                (item: Iprops) => item.child && item.child.length ?
                    renderSubMenu(item) : renderMenuItem(item)
            )}
        </Menu>
    )
}
