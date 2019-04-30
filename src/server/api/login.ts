import { Ajax } from '@server/axios'
export default {
  // 登录
  loginPOST(data: IUserStore.LoginParam): Promise<any> {
    return Ajax.post('/user/login', data || {})
  }
}
