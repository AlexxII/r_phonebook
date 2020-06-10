import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { PhoneDialog, SettingsDialog } from '../../components'
import { connect } from 'react-redux'
import { requestPhone, freeBusyNumber, updatePhone, setDialogState, showDriveDialog, savePhoneData, showNoty, loadingData } from '../../store/phones/actions'

const DriveIn = ({ data, currentPhone, filterData, freeBusyNumber, updatePhone, setDialogState, phoneDialog, settingsDialog, loadingData, showDriveDialog, savePhoneData, showNoty }) => {

  const handleClickOpen = () => {
    const data = {
      id: null,
      operator: filterData.operator,
      range: filterData.range,
      status: filterData.status
    }
    loadingData(true)
    showDriveDialog(data)
  };

  const handleClose = () => {
    if (currentPhone.id && !currentPhone.search) {
      freeBusyNumber(currentPhone.id)
    }
    setDialogState(false)
  };

  const handleSave = () => {
    if (currentPhone.status) {
      const data = {
        ...currentPhone,
        id: currentPhone.id
      }
      updatePhone(data)
    } else {
      showNoty({
        variant: 'warning',
        duration: 1500,
        text: 'Заполните обязательное поле'
      })
      console.log('Empty');
    }
  }
  const inputHndl = (e) => {
    let name = e.target.name
    let value = e.target.value
    savePhoneData({
      name,
      data: value
    })
  }

  const sInputHndl = (e) => {

  }

  const sCloseHndl = (e) => {

  }

  const sSaveHndl = (e) => {

  }

  return (
    <Fragment>
      <Grid container spacing={0} className="phone-dialog-button">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Начать опрос
          </Button>
        <PhoneDialog open={phoneDialog.open} phone={currentPhone} inputHndl={inputHndl} closeHdl={handleClose} saveHndl={handleSave} />
      </Grid>
      <SettingsDialog open={settingsDialog.open} inputHndl={sInputHndl} closeHdl={sCloseHndl} saveHndl={sSaveHndl} />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    data: state.phones,
    currentPhone: state.phones.currentPhone,
    filterData: state.phones.filterData,
    phoneDialog: state.phones.phoneDialog,
    settingsDialog: state.phones.settingsDialog
  }
}
const mapDispatchToProps = {
  requestPhone,
  loadingData,
  freeBusyNumber,
  updatePhone,
  setDialogState,
  showDriveDialog,
  savePhoneData,
  showNoty
}

export default connect(mapStateToProps, mapDispatchToProps)(DriveIn)