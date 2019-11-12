import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../App';

import { Provider } from "react-redux";
import thunk from "redux-thunk";

import configureStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Initialize mock store with state
const initialState = {
  city: {
    cities: []
  },
  user: {
    userEmail: "",
    userImage: "",
    userId: ""
  }
};
const store = mockStore(initialState);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
