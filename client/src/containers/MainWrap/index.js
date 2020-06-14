import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home, Results } from '../../pages'
import { requestPollCodes } from '../../store/phones/actions'

const MainWrap = ({ noty, requestPollCodes }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // запрос кодов опросов
    requestPollCodes()
  }, [])

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

const mapDispatchToProps = {
  requestPollCodes
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWrap)