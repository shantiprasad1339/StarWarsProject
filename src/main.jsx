import React from 'react'
import ReactDOM from 'react-dom/client'
import Starwars from './Component/Starwars.jsx'
import { Provider } from 'react-redux';
import store from './Component/Redux/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Starwars/>
    </Provider>
  </React.StrictMode>,
)
