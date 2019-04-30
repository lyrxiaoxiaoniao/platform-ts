import { Ajax } from '@server/axios'
export default {
  // 列表
  articleListGET(): Promise<any> {
    return Ajax.get('/test')
  }
}