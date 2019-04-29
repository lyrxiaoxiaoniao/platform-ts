import { observable, action } from 'mobx'
import { StoreExt } from '@utils/reactExt'
export class ArticleStore extends StoreExt {
  @observable content: string = ''
  @observable title: string = ''
  @action
  change() {}
}
export default new ArticleStore()
