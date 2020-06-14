import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import { SettingsBar, PollSelect } from '../containers'
import { Table } from '../components'
import { requestResults, storePollSelect } from '../store/phones/actions'

const Results = ({ data, requestResults, currentPoll, storePollSelect }) => {
  useEffect(() => {
    requestResults()
  }, [])

  const handlePollChange = (e) => {
    storePollSelect(e.target.value)
  }

  return (
    <Fragment>
      <SettingsBar title={'Результаты'} />
      <Grid container spacing={0} className="select-section">
        <Grid item xs={12} sm={4} md={2}>
          <PollSelect callb={handlePollChange} codesPool={data.pollCodes} code={currentPoll} />
        </Grid>
      </Grid>
      <Table data={data.results} />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    data: state.phones,
    currentPoll: state.phones.currentPoll
  }
}

const mapDispatchToProps = {
  requestResults,
  storePollSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
