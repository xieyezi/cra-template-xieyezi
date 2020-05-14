export interface Ibreadcrumb {
  title: string
  path: string
}

export interface IRouteConfig {
  path: string
  exact?: boolean
  component: React.ComponentType<any>
  pageTitle?: string
  breadcrumb?: Ibreadcrumb[] // 面包屑导航
  auth?: boolean // 是否进行路由鉴权
  redirect?: string // 暂未使用
  useLayout?: boolean // 是否使用布局
  strict?: boolean
  sensitive?: boolean
}
