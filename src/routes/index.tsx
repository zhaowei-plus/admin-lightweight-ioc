import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routesConfig from './config'

export default () => {
  return (
    <Switch>
      {
        routesConfig.map(route => {
          if (Array.isArray(route.children)) {
            return route.children.map(subRoute => (
              <Route
                key={subRoute.path}
                path={subRoute.path}
                component={subRoute.component}
              />
            )).concat([
              (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  render={() => <Redirect to={route.children[0].path} />}
                />
              ),
            ])
          }
          return (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component} />
          )
        })
      }
      <Route
        exact
        path="/"
        render={() => <Redirect to={routesConfig[0].path} />}
      />
    </Switch>
  )
}
