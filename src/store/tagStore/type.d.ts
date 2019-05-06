import { TagStore as TagStoreModel } from './index'

export as namespace ITagStore

export interface TagStore extends TagStoreModel {}

export interface ITag {
  id?: string | number
  label: string
  [key: string | number]: any
}
export interface ITagId {
  id: string | number
}
