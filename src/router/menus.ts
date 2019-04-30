const menus = [
  {
    key: '/app',
    link: '/app',
    title: '首页',
    icon: 'home',
    child: [
      {
        key: '/app/home',
        link: '/app/home',
        title: 'dashbord',
        icon: ''
      }
    ]
  },
  {
    key: '/app/article',
    link: '/app/article',
    title: '文章',
    icon: 'home',
    child: [
      {
        key: '/app/article/add',
        link: '/app/article/add',
        title: '新增',
        icon: ''
      },
      {
        key: '/app/article/list',
        link: '/app/article/list',
        title: '列表',
        icon: ''
      }
    ]
  }
]

export default menus
