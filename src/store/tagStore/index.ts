import { observable, action, runInAction } from 'mobx'
import { StoreExt } from '@utils/reactExt'
export class TagStore extends StoreExt {
  @observable
  listData: ITagStore.ITag[] = []
  @observable visible: boolean = false
  @action
  showModal = () => {
    this.visible = true
  }
  @action
  closeModal = () => {
    this.visible = false
  }
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
      this.onSuccess(res, true)
      this.closeModal()
      return res
    } catch (error) {
      return error
    }
  }
  @action
  editTag = async (tag: ITagStore.ITag) => {
    try {
      const res = await this.api.tagApi.tagEditPOST(tag)
      this.onSuccess(res, true)
      this.closeModal()
      return res
    } catch (error) {
      return error
    }
  }
  @action
  deleteTag = async (data: ITagStore.ITagId) => {
    try {
      const res = await this.api.tagApi.tagDELETE(data)
      this.onSuccess(res, true)
      return res
    } catch (error) {
      return error
    }
  }
  onSuccess = (res: any, refresh: boolean = false) => {
    if (res.success) {
      this.$message.success(res.data.message)
      refresh && this.getList()
    }
  }
}
export default new TagStore()
