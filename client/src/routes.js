import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import About from './components/About'
import PythonFeaturesInJS from './posts/PythonFeaturesInJS'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/about' component={ About } />
          <Route exact path='/posts/python-features-in-js' component={PythonFeaturesInJS} />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )


/*
other routes from example: https://github.com/alexanmtz/material-sense
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } />

*/
