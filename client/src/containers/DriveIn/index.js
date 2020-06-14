import React, { Fragment } from 'react';

import { PhoneDialog, SettingsDialog } from '../../components'
import { connect } from 'react-redux'
import { requestPhone, freeBusyNumber, updatePhone, setDialogState, showSettingsDialog, savePhoneData, 
  storeNewPoll, dropNewPollData, showNoty, saveNewPoll } from '../../store/phones/actions'

const DriveIn = ({ data, currentPhone, freeBusyNumber, updatePhone, newPoll, dropNewPollData,
  setDialogState, phoneDialog, settingsDialog, savePhoneData, showSettingsDialog, storeNewPoll, saveNewPoll, showNoty }) => {

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
    let name = e.target.name
    let value = e.target.value
    storeNewPoll({
      name,
      data: value
    })
  }

  const sCloseHndl = (e) => {
    dropNewPollData()
    showSettingsDialog(false)
  }

  const sSaveHndl = (e) => {
    saveNewPoll()
    showSettingsDialog(false)
  }

  return (
    <Fragment>
      <PhoneDialog open={phoneDialog.open} phone={currentPhone} inputHndl={inputHndl} closeHdl={handleClose} saveHndl={handleSave} />
      <SettingsDialog open={settingsDialog.open} poll={newPoll} inputHndl={sInputHndl} closeHdl={sCloseHndl} saveHndl={sSaveHndl} />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    data: state.phones,
    currentPhone: state.phones.currentPhone,
    phoneDialog: state.phones.phoneDialog,
    settingsDialog: state.phones.settingsDialog,
    newPoll: state.phones.newPoll
  }
}
const mapDispatchToProps = {
  requestPhone,
  freeBusyNumber,
  updatePhone,
  setDialogState,
  showSettingsDialog,
  dropNewPollData,
  savePhoneData,
  storeNewPoll,
  saveNewPoll,
  showNoty
}

export default connect(mapStateToProps, mapDispatchToProps)(DriveIn)