import React from 'react'
import ReactDOM from 'react-dom'
import AuthProvider from './v2/auth/AuthProvider'
import '../css/admin/admin.css'
import '../css/admin/index.admin.css'
import '../css/admin/app.admin.css'
import './v2/Page/page.css'
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('PWA_ROOT')
)