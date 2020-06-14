import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import { PhoneFilter, HomeBar, PhoneSearch, DriveIn, PollSelect } from '../containers'
import { showSettingsDialog, loadingData, showDriveDialog, storePollSelect } from '../store/phones/actions'

const Home = ({ showSettingsDialog, data, loadingData, showDriveDialog, filterData, storePollSelect, currentPoll }) => {

  const handleSettingsDialogOpen = (e) => {
    showSettingsDialog(true)
    console.log(e);
  }

  const handlePhoneDialogOpen = () => {
    const data = {
      id: null,
      operator: filterData.operator,
      range: filterData.range,
      status: filterData.status
    }
    loadingData(true)
    showDriveDialog(data)
  };

  const handlePollChange = (e) => {
    storePollSelect(e.target.value)
  }

  return (
    <Fragment>
      <HomeBar menuHndl={handleSettingsDialogOpen} />
      <PhoneSearch />
      <Grid container spacing={2} className="select-section">
        <Grid item xs={12} sm={4} md={2}>
          <PollSelect callb={handlePollChange} codesPool={data.pollCodes} code={currentPoll} />
        </Grid>
        <Grid item xs={12} sm={8} md={4} >
          {!currentPoll &&
            <Alert severity="error">Внимание! Выберите код опроса.</Alert>
          }
        </Grid>
      </Grid>
      <PhoneFilter />
      <Grid container className="drive-btn">
        {currentPoll &&
          <Button variant="outlined" color="primary" onClick={handlePhoneDialogOpen}>
            Начать опрос
        </Button>
        }
      </Grid>
      <DriveIn />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    data: state.phones,
    filterData: state.phones.filterData,
    currentPoll: state.phones.currentPoll
  }
}
const mapDispatchToProps = {
  showSettingsDialog,
  loadingData,
  showDriveDialog,
  storePollSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)