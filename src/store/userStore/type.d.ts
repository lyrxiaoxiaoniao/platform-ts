import { UserStore as UserStoreModel } from './index'
import Password from 'antd/lib/input/Password';

export as namespace IUserStore

export interface UserStore extends UserStoreModel {}

export interface IUser {
    username?: string
    password?: string
    token?: string
}
export interface LoginParam {
    username: string
    password: string
}