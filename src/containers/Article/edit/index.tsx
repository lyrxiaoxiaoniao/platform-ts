import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import MdEditor from 'react-markdown-editor-lite'
import { Form, Input, Upload, Icon, message, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { observer, inject } from 'mobx-react'
interface MdType {
  [key: string]: any
}
interface Iprops {
  routerStore: RouterStore
  articleStore: IArticleStore.ArticleStore
  tagStore: ITagStore.TagStore
  [key: string]: any
}
// 上传图片
function beforeUpload(file: any) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 5
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!')
  }
  return isJPG && isLt2M
}
@inject('routerStore', 'articleStore', 'tagStore')
@observer
class AddArticleForm extends ComponentExt<FormComponentProps & Iprops, any> {
  state = {
    loading: false,
    content: '',
    head_url: '',
    title: '',
    tagIds: []
  }
  componentDidMount() {
    this.props.tagStore.getList()
    const { params } = this.props.match
    this.props.articleStore.findArticle(params).then(res => {
      const { article } = this.props.articleStore
      this.setState({
        content: article.content,
        head_url: article.head_url,
        title: article.title,
        tagIds: article.Tags.map((v: any) => v.id)
      })
    })
  }
  public mdEditor: any
  handleEditorChange = ({ html, md }: MdType) => {
    // console.log('handleEditorChange', html, md, this.handleGetMdValue())
  }
  handleGetMdValue = () => {
    return this.mdEditor && this.mdEditor.getMdValue()
  }
  handleGetHtmlValue = () => {
    return this.mdEditor && this.mdEditor.getHtmlValue()
  }
  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({
        head_url: info.file.response.data.files[0],
        loading: false
      })
    }
  }
  handleImageUpload = (file: any, callback: any) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataURItoBlob = (dataURI: any) => {
        var byteString = atob(dataURI.split(',')[1])
        var mimeString = dataURI
          .split(',')[0]
          .split(':')[1]
          .split(';')[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], { type: mimeString })
      }
      const blob = dataURItoBlob(reader.result)
      const fd = new FormData()
      fd.append('file', blob)
      this.$Http
        .post(this.api.serverUri.uploadAPi, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res: any) => {
          if (res.success) {
            callback(res.data.files[0])
          }
        })
    }
    reader.readAsDataURL(file)
  }
  normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  handleSubmit = (e: any, str?: any) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { article } = this.props.articleStore
        const data1 = {
          tagIds: values.tagIds,
          id: article.id,
          title: values.title,
          head_url: this.state.head_url,
          content: this.handleGetMdValue()
        }
        this.props.articleStore.editArticle(data1).then(res => {
          if (res.success) {
            this.$message.success(res.data.message)
            this.props.routerStore.history.push('/app/article/list')
          }
        })
      }
    })
  }
  public render() {
    const { getFieldDecorator } = this.props.form
    const { listData } = this.props.tagStore
    const { content, head_url, title, tagIds } = this.state
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='文章标题'>
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [
                {
                  required: true,
                  message: '请输入文章标题!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='文章标签'>
            {getFieldDecorator('tagIds', {
              initialValue: tagIds,
              rules: [
                {
                  required: true,
                  message: '请选择文章标签！',
                  type: 'array'
                }
              ]
            })(
              <Select mode='multiple' placeholder='请选择文章标签！'>
                {listData.map(
                  (v: ITagStore.ITag): any => (
                    <Select.Option key={v.id} value={v.id}>
                      {v.label}
                    </Select.Option>
                  )
                )}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='文章主图'>
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile
            })(
              <Upload
                name='file'
                action={this.api.serverUri.uploadAPi}
                listType='picture-card'
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {head_url ? (
                  <img
                    src={head_url}
                    style={{ width: '150px', height: 'auto' }}
                    alt='avatar'
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </Form.Item>
          <Form.Item label='文章内容'>
            <MdEditor
              ref={(node: any) => (this.mdEditor = node)}
              style={{ height: '350px' }}
              value={content}
              onChange={this.handleEditorChange}
              onImageUpload={this.handleImageUpload}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              更新文章
            </Button>
            {/* <Button
              onClick={(e: any) => {
                this.handleSubmit(e, '1')
              }}
            >
              保存文章
            </Button> */}
          </Form.Item>
        </Form>
        {/* <div dangerouslySetInnerHTML={{__html: '<p><strong>123</strong></p><h1>123123123</h1>'}}></div> */}
      </div>
    )
  }
}
const AddArticle = Form.create()(AddArticleForm)
export default AddArticle
