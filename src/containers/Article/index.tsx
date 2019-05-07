import './index.scss'
import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import { Table, Divider, Tag, Avatar, Icon, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { inject, observer } from 'mobx-react'
interface IStoreProps {
  routerStore: RouterStore
  articleStore: IArticleStore.ArticleStore
}
@inject('articleStore', 'routerStore')
@observer
class Article extends ComponentExt<IStoreProps & RouterStore> {
  componentDidMount() {
    this.props.articleStore.getList()
  }
  toUpdateArticle(id: any) {
    const { history } = this.props.routerStore
    history.push(`/app/article/update/${id}`)
  }
  public columns: ColumnProps<any>[] = [
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
    // {
    //   title: '创建时间',
    //   dataIndex: 'createdAt',
    //   width: 250,
    //   key: 'createdAt'
    // },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 250,
      key: 'updatedAt'
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
      render: (text: string, record: any) => (
        <span className='arclink'>
          <Icon onClick={() => this.toUpdateArticle(record.id)} type='edit' />
          <Divider type='vertical' />
          <Popconfirm
            placement='top'
            title='确认删除?'
            onConfirm={() =>
              this.props.articleStore.deleteArticle({ id: record.id })
            }
            okText='Yes'
            cancelText='No'
          >
            <Icon type='delete' />
          </Popconfirm>
        </span>
      )
    }
  ]
  public render() {
    const { listData } = this.props.articleStore
    return (
      <>
        <Table
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={listData}
        />
      </>
    )
  }
}
export default Article
