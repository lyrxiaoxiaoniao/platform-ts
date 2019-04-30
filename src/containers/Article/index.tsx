import './index.scss'
import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import { Table, Divider, Tag } from 'antd'
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
    key: 'head_url'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: '作者',
    key: 'User.id',
    dataIndex: 'User.username',
    render: text => <Tag>{text}</Tag>
  },
  {
    title: '操作',
    key: 'action',
    render: (text: string) => (
      <span>
        <a href='javascript:;'>Edit</a>
        <Divider type='vertical' />
        <a href='javascript:;'>Delete</a>
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
          dataSource={listData.slice().map(v=>v)}
        />
      </>
    )
  }
}
export default Article
