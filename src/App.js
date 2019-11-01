import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './screen/Landing.js';
import Cities from './screen/Cities.js';
import City from './screen/City.js';
import CreateAccount from './screen/CreateAccount';
import Login from './screen/Login';

// redux
import { connect } from "react-redux";
import { storeUserInfo, logoutUser } from "./store/actions/userActions";

// decoding jwt
const jwtDecode = require('jwt-decode');


class App extends React.Component {
  componentDidMount() {
    // check if token exists
    // if it exists but is not valid: log user out
    // if it exist & is valid: store info in store
    if (window.localStorage.getItem("userToken")) {
      const token = window.localStorage.getItem("userToken");
      const tokenPlain = jwtDecode(token);

      const currentTime = Date.now().valueOf() / 1000;

      // check if token is expired and log user out if it is
      // see https://github.com/auth0/jwt-decode/issues/53 for more info
      if (tokenPlain.exp < currentTime) {
        this.props.logoutUser(tokenPlain.email)

      // store user info in store if token is not expired
      } else {
        this.props.storeUserInfo({
          userEmail: tokenPlain.email,
          userImage: tokenPlain.userImage,
          userId: tokenPlain.id,
          username: tokenPlain.username
        })
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/logged_in/:token' component={Landing} />
            <Route exact path='/cities' component={Cities} />
            <Route path='/cities/:city' component={City} />
            <Route path='/user/create-account' component={CreateAccount} />
            <Route path='/user/login' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>  
    ); 
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.userEmail,
    userImage: state.user.userImage,
    userId: state.user.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserInfo: userInfo => dispatch(storeUserInfo(userInfo)),
    logoutUser: email => dispatch(logoutUser(email))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);