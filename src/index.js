
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import axios from 'axios';
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './views/App';
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import {isLogin} from './views/utils'
const crypto = require("crypto")

setInterval(()=>{
  var text = 'aa1945373742043f852dfe83b1dc61954353a27914877ec7fd0d6cfcbe8391f7' + Date.now()
  var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
  var key = 'mujhenhipta';
  var cipher = crypto.createCipher(algorithm, key);  
  var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); 
  localStorage.setItem("authtoken",encrypted)
},5000)

axios.interceptors.request.use(
  request => {
    if(request.url.includes('get') || request.url.includes('live') || request.url.includes('volume') || request.url.includes('order') || request.url.includes('all') || request.url.includes('check') || request.url.includes('getbtc') || request.url.includes('login') || request.url.includes('register') || request.url.includes("request")){
        request.headers['Authtoken'] = localStorage.getItem("authtoken")
    }
    return request;
  },
  err =>  {
      return Promise.reject(err);
  }
)
ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <HashRouter>
        <Switch>
        <Route path="/" render={props=>(
            isLogin() ? 
            <AdminLayout {...props}/>
            :
            <App {...props}></App>
          )}/>
          <Route path="/signin" render={(props)=><App {...props}></App>}/>
          <Redirect from="/"  to="/admin/dashboard" />
        </Switch>
      </HashRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
