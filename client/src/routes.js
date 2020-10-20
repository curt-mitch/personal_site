import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Main from './components/Main'
import PostsList from './components/PostsList';
import ProjectsList from './components/ProjectsList';
import About from './components/About'
import PythonFeaturesInJS from './posts/PythonFeaturesInJS'
import EvaluatingMTPerformance from './posts/EvaluatingMTModels';
import JPENTranslator from './projects/JPENTranslator';
import CurtMitchSiteWalkthrough from './projects/CurtMitchSiteWalkthrough';
import ScrollToTop from './components/ScrollTop'

export default props => (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/posts' component={ PostsList } />
          <Route exact path='/projects' component={ ProjectsList } />
          <Route exact path='/about' component={ About } />
          <Route exact path='/post/python-features-in-js' component={PythonFeaturesInJS} />
          <Route exact path='/post/evaluating-machine-translation-models' component={EvaluatingMTPerformance} />
          <Route exact path='/project/jp-en-translator' component={JPENTranslator} />
          <Route exact path='/project/website-walkthrough' component={CurtMitchSiteWalkthrough} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  )
