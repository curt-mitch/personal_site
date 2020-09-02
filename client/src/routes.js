import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Main from './components/Main'
import About from './components/About'
import PythonFeaturesInJS from './posts/PythonFeaturesInJS'
import EvaluatingMTPerformance from './posts/EvaluatingMTModels';
import ScrollToTop from './components/ScrollTop'

export default props => (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/about' component={ About } />
          <Route exact path='/posts/python-features-in-js' component={PythonFeaturesInJS} />
          <Route exact path='/posts/evaluating-machine-translation-models' component={EvaluatingMTPerformance} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  )


/*
other routes from example: https://github.com/alexanmtz/material-sense
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } />

*/
