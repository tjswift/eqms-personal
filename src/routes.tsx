import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Root from './components/layout/Root';
import Header from './components/layout/Header';
import IndexPage from './pages/index';
import LessonsPage from './pages/lessons';

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.


//todo: get this value from the database
const userName = "FirstName";
const welcomeString = "Welcome " + userName;

const Routes: React.SFC = () => (
    <Root>
    <Header title="EQMS" welcomeMessage={welcomeString} />
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/lessons" component={LessonsPage} />
      <Route component={() => <div><p>Not Found - this page may be implemented later.</p></div>} />
    </Switch>
  </Root>
)

export default Routes