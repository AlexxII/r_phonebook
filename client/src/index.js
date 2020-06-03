import React from 'react'
import ReactDom from 'react-dom'
import { SnackbarProvider } from 'notistack';

import { App } from './containers';

const mainDiv = document.getElementById('root');

ReactDom.render(
  <SnackbarProvider hideIconVariant={true}>
    <App />
  </SnackbarProvider>,
  mainDiv
)