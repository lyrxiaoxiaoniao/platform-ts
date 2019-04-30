import { ArticleStore as ArticleStoreModel } from './index'

export as namespace IArticleStore

export interface ArticleStore extends ArticleStoreModel {}

export interface IArticleList {
    [key: string|number]: any
}
