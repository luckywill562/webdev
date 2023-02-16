import React from "react"
import { BrowserRouter as Router, Route, Switch,useLocation} from 'react-router-dom'
import Login from './login'
import Register from './register'
import Notfoundpage from '../app/NotFound'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
  let query = useQuery();
  return (
    <Register step={query.get("step")} />
  );
}

export default class Auth extends React.Component {
 
  render(){
    return (
        <Router>
          <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/register" component={QueryParamsDemo}/>
              <Route path="*" component={Notfoundpage}/>
          </Switch>
        </Router>
    );
  }
}
