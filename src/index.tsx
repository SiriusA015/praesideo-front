import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import App from "./App";
import axios, { AxiosRequestConfig } from "axios";
import { UrlUtils } from "./helpers/Utils";

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Set config
    if (config.url) {
      config.url = UrlUtils.getFullUrl(config.url);
    }
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.baseURL = undefined;
    return config;
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
