import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import { Table, Divider, Tag, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { inject, observer } from 'mobx-react'
const columns: ColumnProps<any>[] = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 150,
    key: 'id'
  },
  {
    title: '标签',
    dataIndex: 'label',
    key: 'label',
    render: text => <Tag color='green'>{text}</Tag>
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    render: (text: string) => (
      <span>
        <Icon type='edit' />
        <Divider type='vertical' />
        <Icon type='delete' />
      </span>
    )
  }
]
interface IStoreProps {
  routerStore: RouterStore
  tagStore: ITagStore.TagStore
}
@inject('tagStore', 'routerStore')
@observer
class Article extends ComponentExt<IStoreProps> {
  componentDidMount() {
    this.props.tagStore.getList()
  }
  public render() {
    const { listData } = this.props.tagStore
    return (
      <>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={listData.slice().map(v => v)}
        />
      </>
    )
  }
}
export default Article
