import { observable, action, runInAction } from 'mobx'
import { StoreExt } from '@utils/reactExt'
export class TagStore extends StoreExt {
  @observable
  listData: ITagStore.TagStore[] = []
  @action
  getList = async () => {
    try {
      const res = await this.api.tagApi.tagListGET()
      runInAction(() => {
        this.listData = res.data.data
      })
      return res
    } catch (error) {
      return error
    }
  }
  @action
  addTag = async (tag: ITagStore.ITag) => {
    try {
      const res = await this.api.tagApi.tagAddPOST(tag)
      return res
    } catch (error) {
      return error
    }
  }
  @action
  editTag = async (tag: ITagStore.ITag) => {
    try {
      const res = await this.api.tagApi.tagEditPOST(tag)
      return res
    } catch (error) {
      return error
    }
  }
  @action
  deleteTag = async (data: ITagStore.ITagId) => {
    try {
      const res = await this.api.tagApi.tagDELETE(data)
      return res
    } catch (error) {
      return error
    }
  }
}
export default new TagStore()
