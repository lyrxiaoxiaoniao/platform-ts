import './index.scss'
import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import { Table, Divider, Tag, Avatar, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { inject, observer } from 'mobx-react'
const columns: ColumnProps<any>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '主图',
    dataIndex: 'head_url',
    key: 'head_url',
    width: 100,
    render: (text: string) => <Avatar src={text} />
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 250,
    key: 'createdAt'
  },
  {
    title: '作者',
    key: 'User.id',
    dataIndex: 'User.username',
    width: 100,
    render: text => <Tag color='green'>{text}</Tag>
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
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
  articleStore: IArticleStore.ArticleStore
}
@inject('articleStore', 'routerStore')
@observer
class Article extends ComponentExt<IStoreProps> {
  componentDidMount() {
    this.props.articleStore.getList()
  }
  public render() {
    const { listData } = this.props.articleStore
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
