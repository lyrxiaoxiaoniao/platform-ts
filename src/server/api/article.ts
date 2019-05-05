import { Ajax } from '@server/axios'
export default {
  // 列表
  articleListGET(): Promise<any> {
    return Ajax.get('/article/list')
  },
  // 新增
  articleAddPOST(): Promise<any> {
    return Ajax.get('/test')
  }
}