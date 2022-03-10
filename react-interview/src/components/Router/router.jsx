import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// do not destruct like ClassComponent:anotherName it throw error
// use pascal case for react components, small case for html
import { ClassComponent } from '../Class/classComponents';
import { HocComponent } from '../HOC/hoc';
import { FunctionalCompoent } from '../Functional/functionalComponent';
import { Hooks } from '../Functional/remaningHooks';
import { ErroHandler } from '../Class/errorHandling.jsx';

import Redux from '../redux';
import { Styles } from '../Styles/styles';


/**
 * Route compoent has props: location,path,component,children,render
 * path: '/dashboard'
 * location: {hash,key,pathname,state,search}
 * childre: components
 * render: () => (<component/>)
 */

/**
 * in nested routes
 * When the router’s path and location are successfully matched, a match object is created
 * url : A string that returns the matched part of the URL
  *path : A string that returns the route’s path
   *isExact : A boolean that returns true if the match was exact
* params : An object containing key-value pairs that were matched by the Path-To-RegExp package.
 */

 /**
  * Redirect has prop: to
  * TO accepts object ex: {pathname:'',state:{from: props.location}}
  */

export const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/class">
          <ClassComponent />
        </Route>
        <Route path="/function">
          <FunctionalCompoent />
        </Route>
        <Route exact path="/hooks">
          <Hooks initialCount={0} />
        </Route>
        <Route path="/hoc">
          <HocComponent name={"column"} />
        </Route>
        <Route path="/error">
          <ErroHandler />
        </Route>
        <Route path="/redux">
          <Redux />
        </Route>
        <Route path="/styles">
          <Styles />
        </Route>
        <Route path="/routes" component={RouterLinks} />
      

        {/* <Route exact path="/">
          <Redirect to="/routes" />
        </Route>  */}
        <Route exact path="/" Redirect component={RouterLinks} />
        {/* <Route exact path="*"  component={RouterLinks}/> */}
        <ProtectedRoute exact path='/dashboard' component={ClassComponent} />
      </Switch>
    </Router>
  )
}

const RouterLinks = ({match}) => {
  console.log(match);
  return (
    <ul>
      <li>
        <Link to="/class">class component topics</Link>
      </li>
      <li>
        <Link to="/function">function component topics</Link>
      </li>
      <li>
        <Link to="/hooks">hooks topics</Link>
      </li>
      <li>
        <Link to="/hoc">hoc topics</Link>
      </li>
      <li>
        <Link to="/error">error topics</Link>
      </li>
      <li>
        <Link to="/redux">redux topics</Link>
      </li>
    </ul>
  )
}

const ProtectedRoute = ({ component: Component, isAuthenticated = true, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (isAuthenticated) {
          console.log(Component);
          return <Component />
        } else {
          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        }
      }
    } />)
}
