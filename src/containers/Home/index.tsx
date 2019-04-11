import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';
class Home extends Component {
  public render() {
    const props = {
      name: 'file',
      action: 'http://localhost:3000/api/upload',
      multiple: true,
      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
      </div>
    )
  }
}

export default Home
