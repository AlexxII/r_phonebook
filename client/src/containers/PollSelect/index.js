import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const PollSelect = ({ callb, codesPool, code }) => {

  return (
    <Fragment>
      <FormControl fullWidth className="pool-select">
        <InputLabel htmlFor="poll-code">Код опроса</InputLabel>
        <Select defaultValue="" id="poll-code" onChange={callb} name="poll-code" defaultValue={code != 0 ? code : ''}>
          <MenuItem value="" disabled>
            Выберите
              </MenuItem>
          {codesPool.map((item, keyIndex) => {
            return <MenuItem key={keyIndex} value={item.id}>{item.code}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Fragment>
  )
}

export default PollSelect