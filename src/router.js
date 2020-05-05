import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import App from './App'
// 自己实现页面组件的异步按需加载
import asyncComponent from '@components/async-component'
// login直接加载
import Login from '@pages/login'
// 其余所有的都是按需加载
const Layout = asyncComponent(() => import('@components/layout'))
const Home = asyncComponent(() => import('@pages/home'))
const ProductRouter = asyncComponent(() => import('@pages/product/router.js'))
const Order = asyncComponent(() => import('@pages/order'))
const OrderDetail = asyncComponent(() => import('@pages/order/detail'))
const User = asyncComponent(() => import('@pages/user'))
const ErrorPage = asyncComponent(() => import('@pages/error'))

class MRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/"
              render={() => (
                <Layout>
                  <Switch>
                    <Route path="/home" exact component={Home} />
                    <Route path="/product" component={ProductRouter} />
                    <Route path="/product-category" component={ProductRouter} />
                    <Route path="/order/index" component={Order} />
                    <Route
                      path="/order/detail/:orderNumber"
                      component={OrderDetail}
                    />
                    <Route path="/user" component={User} />
                    <Redirect exact from="/order" to="/order/index" />
                    <Redirect exact from="/" to="/home" />
                    <Route component={ErrorPage} />
                  </Switch>
                </Layout>
              )}
            />
          </Switch>
        </App>
      </Router>
    )
  }
}

export default MRouter
