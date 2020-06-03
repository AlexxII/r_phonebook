import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { phoneStatus, townsPool, sexPool } from '../../lib/selects'

export default function DriveForm({ callb, phone }) {
  return (
    <React.Fragment>
      <Typography component={'span'} variant={'body2'}>

        <Grid container spacing={2} className="phone-drive-form">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="phone-status" required>Статус</InputLabel>
              <Select id="phone-status" onChange={callb} name="status" defaultValue={phone.status != 0 ? phone.status : ''}>
                <MenuItem value="" disabled>
                  Выберите
              </MenuItem>
                {phoneStatus.map((item, keyIndex) =>
                  <MenuItem key={keyIndex + 1} value={keyIndex + 1}>{item}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="sex-status">Пол</InputLabel>
              <Select defaultValue="" id="sex-status" onChange={callb} name="sex" defaultValue={phone.sex != 0 ? phone.sex : ''}>
                <MenuItem value="" disabled>
                  Выберите
              </MenuItem>
                {sexPool.map((item, keyIndex) => {
                  return <MenuItem key={keyIndex} value={item.code}>{item.title}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="age"
              label="Возраст"
              fullWidth
              autoComplete="family-name"
              defaultValue={phone.age != 0 ? phone.age : null}
              onInput={callb}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="town-status">Тип н.п.</InputLabel>
              <Select defaultValue="" id="town-status" onChange={callb} name="town" defaultValue={phone.town != 0 ? phone.town : ''}>
                <MenuItem value="" disabled>
                  Выберите
              </MenuItem>
                {townsPool.map((item, keyIndex) => {
                  return <MenuItem key={keyIndex} value={item.code}>{item.title}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} className="footer">
            <FormControl fullWidth>
              <label>Примечание:</label>
              <TextareaAutosize
                name="comment"
                onInput={callb}
                rowsMin={4}
                value={phone.comment}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Typography>
    </React.Fragment>
  );
}