import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home, Results } from '../../pages'
// import {showNoty} from '../../store/phones/actions'

const MainWrap = ({ noty }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!noty.firstInit) {
      enqueueSnackbar(noty.text, {
        variant: noty.variant,
        autoHideDuration: noty.duration,
      })
    }
  }, [noty])

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/results"} component={Results} />
      </Switch>
    </BrowserRouter>
  )

}

const mapStateToProps = state => {
  return {
    data: state.phones,
    noty: state.phones.noty
  }
}

export default connect(mapStateToProps, null)(MainWrap)