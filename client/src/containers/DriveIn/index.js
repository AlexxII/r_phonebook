import React, { Fragment, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';

import { PhoneDialog } from '../../components'
import { connect } from 'react-redux'
import { requestPhone, freeBusyNumber, updatePhone, setDialogState, showDriveDialog, savePhoneData, showNoty } from '../../store/phones/actions'

const DriveIn = ({ data, currentPhone, filterData, freeBusyNumber, updatePhone, setDialogState, phoneDialog, showDriveDialog, savePhoneData, showNoty, noty }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!noty.firstInit) {
      enqueueSnackbar(noty.text, {
        variant: noty.variant,
        autoHideDuration: noty.duration,
      })
    }
  }, [noty])

  const handleClickOpen = () => {
    const data = {
      id: null,
      operator: filterData.operator,
      range: filterData.range,
      status: filterData.status
    }
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

  return (
    <Fragment>
      <Grid container spacing={0} className="phone-dialog-button">
        <Grid item xs={11} sm={11}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Начать опрос
          </Button>
          <PhoneDialog open={phoneDialog.open} phone={currentPhone} inputHndl={inputHndl} closeHdl={handleClose} saveHndl={handleSave} />
        </Grid>
        <Button variant="outlined" color="primary" onClick={e => console.log(e)}>
          Выгрузить
        </Button>
      </Grid>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    data: state.phones,
    currentPhone: state.phones.currentPhone,
    filterData: state.phones.filterData,
    phoneDialog: state.phones.phoneDialog,
    noty: state.phones.noty
  }
}
const mapDispatchToProps = {
  requestPhone,
  freeBusyNumber,
  updatePhone,
  setDialogState,
  showDriveDialog,
  savePhoneData,
  showNoty
}

export default connect(mapStateToProps, mapDispatchToProps)(DriveIn)