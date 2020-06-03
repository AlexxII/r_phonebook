import React, { Fragment, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { DriveForm } from '../../components'

const PhoneDialog = ({ phone, closeHdl, saveHndl, open, inputHndl }) => {

  const Header = () => {
    if (phone.id) {
      return (<h1>70 9 {phone.phone}</h1>)
    } else {
      return <CircularProgress />
    }
  }

  return (
    <Fragment>
      <Typography component={'span'} variant={'body2'}>

        <Grid container spacing={0} className="phone-dialog-button">
          <Grid item xs={12} sm={12}>
            <Dialog
              className="phone-dialog"
              disableBackdropClick
              disableEscapeKeyDown
              open={open}
              maxWidth={'sm'}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <label>номер:</label>
                  <div className="header">
                    <Header />
                  </div>
                  <DriveForm phone={phone} callb={inputHndl} />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeHdl} color="primary">
                  Отмена
              </Button>
                {phone && (
                  <Button onClick={saveHndl} color="primary" autoFocus>
                    Сохранить
                  </Button>
                )
                }
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Typography>
    </Fragment>
  )
}


export default PhoneDialog