import { Ajax } from '@server/axios'
export default {
  // 登录
  loginPOST(data: IUserStore.LoginParam): Promise<any> {
      console.log(data, 'data')
    return Ajax.post('/user/login', data || {})
  }
}
