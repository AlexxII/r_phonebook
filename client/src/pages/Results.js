import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { SettingsBar } from '../containers'
import { Table } from '../components'
import { requestResults } from '../store/phones/actions'

const Results = ({ fetchedData, requestResults }) => {
  useEffect(() => {
    requestResults()
  }, [])

  let results = new Array()
  useEffect(() => {
    results = fetchedData
  }, [fetchedData])

  return (
    <Fragment>
      <SettingsBar />
      <Table data={results} />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    fetchedData: state.phones.results
  }
}

const mapDispatchToProps = {
  requestResults
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
