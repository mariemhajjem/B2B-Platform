import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import App from "./App";
import store from './redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer />
      <App /> 
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
