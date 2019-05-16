import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import { Modal, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { observer } from 'mobx-react'

interface Iprops extends FormComponentProps {
  tagStore: ITagStore.TagStore
  id?: number
  label?: string
  [propName: string]: any
}
@observer
class TagModal extends ComponentExt<Iprops> {
  handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { type, tagStore, id } = this.props
        if (type === 'add') {
          tagStore.addTag(values)
        } else {
          tagStore.editTag({ ...values, id })
        }
      }
    })
  }
  render() {
    const { visible, closeModal } = this.props.tagStore
    const { getFieldDecorator } = this.props.form
    const { label } = this.props
    return (
      <Modal
        title={this.props.type === 'add' ? '新增标签' : '修改标签'}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => closeModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='标签名称'>
            {getFieldDecorator('label', {
              initialValue: label,
              rules: [
                {
                  required: true,
                  message: '请输入标签!'
                }
              ]
            })(<Input placeholder='请输入标签!' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(TagModal)
