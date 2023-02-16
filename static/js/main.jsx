import React from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './v2/redux/redux';
{/**
import App from './mobile/app'
import '../css/mobile/app.css'
*/}
import App from './v2/App'
import '../css/index.css';
import '../../node_modules/@draft-js-plugins/emoji/lib/plugin.css'
import '../css/App.css';
import '../css/default.css';
import '../css/App.profil.css';
import '../css/Fields.css';
import '../css/messagerie.css';
import '../css/Pannel-com.css';
import '../css/Notifications.css'
import '../css/media.css';
import '../css/discussion.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('PWA_ROOT')
);



 


