import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import { Table, Divider, Tag, Icon, Popconfirm, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { inject, observer } from 'mobx-react'
import TagModal from './tagModal'
interface IStoreProps {
  routerStore: RouterStore
  tagStore: ITagStore.TagStore
}
@inject('tagStore', 'routerStore')
@observer
class Article extends ComponentExt<IStoreProps> {
  state = {
    id: undefined,
    label: '',
    type: 'add'
  }
  public columns: ColumnProps<any>[] = [
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
      render: (text: string, record: any) => (
        <span>
          <Icon onClick={() => this.showEditModal(record)} type='edit' />
          <Divider type='vertical' />
          <Popconfirm
            placement='top'
            title='确认删除?'
            onConfirm={() => this.props.tagStore.deleteTag({ id: record.id })}
            okText='Yes'
            cancelText='No'
          >
            <Icon type='delete' />
          </Popconfirm>
        </span>
      )
    }
  ]
  showAddModal() {
    this.props.tagStore.showModal()
    this.setState({
      type: 'add',
      id: undefined,
      label: ''
    })
  }
  showEditModal(record: ITagStore.ITag) {
    this.props.tagStore.showModal()
    this.setState({
      type: 'edit',
      id: record.id,
      label: record.label
    })
  }
  componentDidMount() {
    this.props.tagStore.getList()
  }
  public render() {
    const { listData } = this.props.tagStore
    const { type, id, label } = this.state
    return (
      <>
        <Button
          onClick={() => this.showAddModal()}
          style={{ marginBottom: '10px' }}
        >
          新增标签
        </Button>
        <Table
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={listData}
        />
        <TagModal {...this.props} type={type} id={id} label={label} />
      </>
    )
  }
}
export default Article
