import { IRouteConfig } from '../../typing'
import HomePage from '@/pages/home'
import { HOME } from './path'

const routes: IRouteConfig[] = [
  {
    path: HOME,
    component: HomePage,
    exact: true,
    pageTitle: '首页',
    useLayout: true
  }
]

export default routes
