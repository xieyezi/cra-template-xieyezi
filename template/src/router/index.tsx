import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './config/index'
import { splitTypeOfRoute, omitRouteRenderProperties } from './utils'
import Layout from '../pages/layout'

const [basicRoute, layoutRoute] = splitTypeOfRoute(routes)

const Router: React.FC = () => {
  return (
    <Switch>
      {basicRoute.map(item => {
        return <Route {...omitRouteRenderProperties(item)} key={item.path} component={item.component} />
      })}
      <Route key="dashboard" path="/" component={() => <Layout routes={layoutRoute} />} />
    </Switch>
  )
}

export default Router
