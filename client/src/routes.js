import React, { Suspense, lazy } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import PrimaryLoadingScreen from './components/PrimaryLoadingScreen';

const Main = lazy(() => import('./components/Main'));
const ScrollToTop = lazy(() => import('./components/ScrollTop'));
const About = lazy(() => import('./components/About'));
const PostsList = lazy(() => import('./components/PostsList'));
const ProjectsList = lazy(() => import('./components/ProjectsList'));
const PythonFeaturesInJS = lazy(() => import('./posts/PythonFeaturesInJS'));
const EvaluatingMTPerformance = lazy(() => import('./posts/EvaluatingMTModels'));
const JPENTranslatorWalkthrough = lazy(() => import('./posts/JPENTranslatorWalkthrough'));
const ConcludingSpringboard = lazy(() => import('./posts/ConcludingSpringboard'));
const SQLExecutionOrder = lazy(() => import('./posts/SQLExecutionOrder'));
const UrduNumberClassifier = lazy(() => import('./projects/UrduNumberClassifier'));
const JPENTranslator = lazy(() => import('./projects/JPENTranslator'));
const CurtMitchSiteWalkthrough = lazy(() => import('./projects/CurtMitchSiteWalkthrough'));

export default () => (
    <BrowserRouter>
      <Suspense fallback={<PrimaryLoadingScreen/>}>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={ Main } />
            <Route exact path='/posts' component={ PostsList } />
            <Route exact path='/projects' component={ ProjectsList } />
            <Route exact path='/about' component={ About } />
            <Route exact path='/post/python-features-in-js' component={PythonFeaturesInJS} />
            <Route exact path='/post/evaluating-machine-translation-models' component={EvaluatingMTPerformance} />
            <Route exact path='/post/jp-en-translator-walkthrough' component={JPENTranslatorWalkthrough} />
            <Route exact path='/post/concluding-springboard-next-adventure' component={ConcludingSpringboard} />
            <Route exact path='/post/sql-order-of-execution' component={SQLExecutionOrder} />
            <Route exact path='/project/urdu-number-classifier' component={UrduNumberClassifier} />
            <Route exact path='/project/jp-en-translator' component={JPENTranslator} />
            <Route exact path='/project/website-walkthrough' component={CurtMitchSiteWalkthrough} />
          </Switch>
        </ScrollToTop>
      </Suspense>
    </BrowserRouter>
  )
