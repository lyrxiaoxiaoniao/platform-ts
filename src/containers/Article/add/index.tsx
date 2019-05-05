import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import MdEditor from 'react-markdown-editor-lite'
import { Form, Input, Upload, Icon, message, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { observer, inject } from 'mobx-react'
interface MdType {
  [key: string]: any
}
interface Iprops {
  routerStore: RouterStore
  articleStore: IArticleStore.ArticleStore
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
@inject('routerStore', 'articleStore')
@observer
class AddArticleForm extends ComponentExt<FormComponentProps & Iprops, any> {
  state = {
    loading: false,
    content: '',
    head_url: ''
  }
  componentDidMount() {
    // this.$Http.get('/test').then(res => {
    //   console.log(res)
    // })
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
        const data1 = {
          ...values,
          head_url: this.state.head_url,
          content: this.handleGetHtmlValue()
        }
        console.log('Received values of form: ', data1)
      }
    })
  }
  public render() {
    const {
      getFieldDecorator
      // getFieldsError,
      // getFieldError,
      // isFieldTouched
    } = this.props.form
    const { content, head_url } = this.state
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
              rules: [
                {
                  required: true,
                  message: '请输入文章标题!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='文章主图'>
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                {
                  required: true,
                  message: '请上传主图!'
                }
              ]
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
              style={{ minHeight: '300px' }}
              value={content}
              onChange={this.handleEditorChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              新增文章
            </Button>
            <Button
              onClick={(e: any) => {
                this.handleSubmit(e, '1')
              }}
            >
              保存文章
            </Button>
          </Form.Item>
        </Form>
        {/* <div dangerouslySetInnerHTML={{__html: '<p><strong>123</strong></p><h1>123123123</h1>'}}></div> */}
      </div>
    )
  }
}
const AddArticle = Form.create()(AddArticleForm)
export default AddArticle
