import { Ajax } from '@server/axios'
export default {
  // 列表
  tagListGET(): Promise<any> {
    return Ajax.get('/tag/list')
  },
  // 新增
  tagAddPOST(data: any): Promise<any> {
    return Ajax.post('/tag/add', data)
  },
  // 修改
  tagEditPOST(data: any): Promise<any> {
    return Ajax.post('/tag/update', data)
  },
  // 修改
  tagDELETE(data: any): Promise<any> {
    return Ajax.delete('/tag/delete', data)
  }
}