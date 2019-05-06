import { Ajax } from '@server/axios'
export default {
  // 列表
  articleListGET(): Promise<any> {
    return Ajax.get('/article/list')
  },
  // 查询
  articleFindGET(data: IArticleStore.IArticleID): Promise<any> {
    return Ajax.get('/article/find', data)
  },
  // 新增
  articleAddPOST(data: IArticleStore.IArticle): Promise<any> {
    return Ajax.post('/article/add', data)
  },
  // 修改
  articleEditPOST(data: IArticleStore.IArticle): Promise<any> {
    return Ajax.post('/article/update', data)
  },
  // 修改
  articleDELETE(data: IArticleStore.IArticleID): Promise<any> {
    return Ajax.delete('/article/delete', data)
  }
}