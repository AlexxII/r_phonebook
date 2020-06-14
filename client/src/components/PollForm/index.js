import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

export default function PollForm({ callb }) {
  return (
    <React.Fragment>
      <Typography component={'span'} variant={'body2'}>
        <Grid container spacing={2} className="poll-create-form">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                name="title"
                label="Наименование опроса"
                fullWidth
                required
                autoComplete="family-name"
                onInput={callb}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="code"
                label="Код опроса"
                fullWidth
                required
                autoComplete="family-name"
                onInput={callb}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className="footer">
            <FormControl fullWidth>
              <label>Примечание:</label>
              <TextareaAutosize
                name="comment"
                onInput={callb}
                rowsMin={4}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Typography>
    </React.Fragment>
  );
}