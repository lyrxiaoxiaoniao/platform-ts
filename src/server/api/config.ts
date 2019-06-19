const isDev = process.env.NODE_ENV === 'development'
const uri = isDev
  ? {
      baseUrl: 'http://192.168.40.156:3000/api',
      uploadAPi: 'http://192.168.40.156:3000/api/upload'
    }
  : {
      baseUrl: 'http://www.liuyouren.top/api',
      uploadAPi: 'http://www.liuyouren.top/api/upload'
    }
export default uri
