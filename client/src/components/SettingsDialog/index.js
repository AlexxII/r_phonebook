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

import { PollForm } from '../../components'

const SettingsDialog = ({ poll, inputHndl, closeHdl, saveHndl, open }) => {

  return (
    <Fragment>
      <Typography component={'span'} variant={'body2'}>

        <Grid container spacing={0} className="poll-dialog-button">
          <Grid item xs={12} sm={12}>
            <Dialog
              className="poll-dialog"
              disableBackdropClick
              disableEscapeKeyDown
              open={open}
              maxWidth={'sm'}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Добавить опрос</DialogTitle>
              <DialogContent>
                <PollForm callb={inputHndl}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeHdl} color="primary">
                  Отмена
                </Button>
                {poll.code && poll.title && (
                  <Button onClick={saveHndl} color="primary">
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


export default SettingsDialog