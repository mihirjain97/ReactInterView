import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';

function App(props) {
  return (
    <div className='container px-3 mx-auto'>
        <Header />
          <div>
            <Switch>
              <Route path='/sign-up' component={SignUp} />
              <Route path='/sign-in' component={SignIn} />
              <Route path='/' component={Home} />
            </Switch>
          </div>
        {/* <Footer /> */}
      </div>

  );
}

export default withRouter(App);
