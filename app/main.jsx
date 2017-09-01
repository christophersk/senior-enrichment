'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';

import store from './store'
import Site from './components/Site'

render (
  <Provider store={store}>
    <Site/>
  </Provider>,
  document.getElementById('main')
)
