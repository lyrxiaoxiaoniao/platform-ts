import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
interface IStoreProps {
  routerStore: RouterStore
}
@inject('routerStore')
@observer
class Home extends Component<IStoreProps> {
  changeLink = (e: any, str: string) => {
    this.props.routerStore.history.push(str)
  }
  public render() {
    const props = {
      name: 'file',
      action: 'http://localhost:3000/api/upload',
      multiple: true,
      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type='upload' /> Click to Upload
          </Button>
        </Upload>
        <Button
          onClick={(e: any) => {
            this.changeLink(e, '/login')
          }}
        >
          <Icon type='upload' /> ceshi
        </Button>
        <Button
          onClick={(e: any) => {
            this.changeLink(e, '/app/article/list')
          }}
        >
          <Icon type='upload' /> 123
        </Button>
      </div>
    )
  }
}

export default Home
