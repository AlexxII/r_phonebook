import React from 'react'
import ReactDom from 'react-dom'

import { App } from './containers';

const mainDiv = document.getElementById('root');

ReactDom.render(
    <App />,
  mainDiv
)