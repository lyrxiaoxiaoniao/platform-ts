import { observable, action, runInAction } from 'mobx'
import { StoreExt } from '@utils/reactExt'
export class ArticleStore extends StoreExt {
  @observable
  listData: IArticleStore.IArticle[] = []
  @observable
  article: IArticleStore.IArticle = {
    title: '',
    content: '',
    head_url: ''
  }
  @action
  findArticle = async (data: IArticleStore.IArticleID) => {
    try {
      const res = await this.api.articleApi.articleFindGET(data)
      this.article = res.data.data
      return res
    } catch (error) {
      return error
    }
  }
  @action
  getList = async () => {
    try {
      const res = await this.api.articleApi.articleListGET()
      runInAction(() => {
        this.listData = res.data.data
      })
      return res
    } catch (error) {
      return error
    }
  }
  @action
  addArticle = async (article: IArticleStore.IArticle) => {
    try {
      const res = await this.api.articleApi.articleAddPOST(article)
      return res
    } catch (error) {
      return error
    }
  }
  @action
  editArticle = async (article: IArticleStore.IArticle) => {
    try {
      const res = await this.api.articleApi.articleEditPOST(article)
      return res
    } catch (error) {
      return error
    }
  }
  @action
  deleteArticle = async (data: IArticleStore.IArticleID) => {
    try {
      const res = await this.api.articleApi.articleDELETE(data)
      this.getList()
      return res
    } catch (error) {
      return error
    }
  }
}
export default new ArticleStore()
