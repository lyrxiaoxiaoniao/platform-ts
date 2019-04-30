import React from 'react'
import { ComponentExt } from '@utils/reactExt'
import MdEditor from 'react-markdown-editor-lite'
const mock_content = "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it."
interface MdType {
  [key: string]: any
}
class AddArticle extends ComponentExt {
  componentDidMount() {
    this.$Http.get('/test').then(res => {
      console.log(res)
    })
  }
  public mdEditor: any
  handleEditorChange({ html, md }: MdType) {
    console.log('handleEditorChange', html, md)
  }
  handleGetMdValue = () => {
    this.mdEditor && alert(this.mdEditor.getMdValue())
  }
  handleGetHtmlValue = () => {
    this.mdEditor && alert(this.mdEditor.getHtmlValue())
  }
  public render() {
    return (
      <div>
        <nav>
          <button onClick={this.handleGetMdValue} >getMdValue</button>
          <button onClick={this.handleGetHtmlValue} >getHtmlValue</button>
        </nav>
        <MdEditor
          ref={(node: any) => this.mdEditor = node}
          style={{ minHeight: '300px' }}
          value={mock_content}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}
export default AddArticle
