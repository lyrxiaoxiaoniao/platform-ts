import { observable, action, runInAction } from 'mobx'
import { StoreExt } from '@utils/reactExt'
export class ArticleStore extends StoreExt {
  @observable
  listData: IArticleStore.IArticleList[] = []
  @action
  getList = async () => {
    try {
      const res = await this.api.articleApi.articleListGET()
      runInAction(() => {
        this.listData = res.data.data.map((v: any) => v)
      })
      return res
    } catch (error) {
      return error
    }
  }
  @action
  addArticle = async (article: IArticleStore.IArticle) => {
    try {
      const res = await this.api.articleApi.articleListGET()
      runInAction(() => {
        this.listData = res.data.data.map((v: any) => v)
      })
      return res
    } catch (error) {
      return error
    }
  }
}
export default new ArticleStore()
