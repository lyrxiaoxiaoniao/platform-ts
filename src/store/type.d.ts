declare interface IStore {
    userStore: IUserStore.UserStore
    routerStore: RouterStore
    articleStore: IArticleStore.ArticleStore
    tagStore: ITagStore.TagStore
}