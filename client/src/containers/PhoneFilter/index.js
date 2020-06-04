import React, { Fragment, useState } from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { telecomOperators, phoneStatus, phonesRange } from '../../lib/selects'
import { connect } from 'react-redux'
import { saveFilterData } from '../../store/phones/actions'

const PhoneFilter = ({ filterData, saveFilterData }) => {
  const [phoneRange, setPhoneRange] = useState(phonesRange[0].range)

  const handleOperatorChange = (e) => {
    const name = e.target.name
    const data = e.target.value
    saveFilterData({
      name, data
    })
    setPhoneRange(phonesRange[e.target.value].range)
    saveFilterData({
      name: 'range',
      data: 0
    })
  }

  const handleStatusChange = (e) => {
    console.log(e);
    const name = e.target.name
    const data = e.target.value
    saveFilterData({
      name, data
    })
  }

  const handleRangeChange = (e) => {
    const name = e.target.name
    const data = e.target.value
    saveFilterData({
      name, data
    })
  }

  return (
    <Fragment>
      <Grid className="phone-drive-filter">
        <Grid container spacing={2} className="phone-drive-form">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="phone-operator-select-label">Оператор связи</InputLabel>
              <Select
                labelId="phone-operator-select-label"
                onChange={handleOperatorChange}
                value={filterData.operator}
                name="operator"
              >
                {telecomOperators.map((item, keyIndex) =>
                  <MenuItem key={keyIndex} value={keyIndex}>{item}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="phone-operator-select-label">Диапазон номеров</InputLabel>
              <Select
                labelId="phone-operator-select-label"
                onChange={handleRangeChange}
                value={filterData.range}
                name="range"
              >
                {phoneRange.map((item, keyIndex) =>
                  <MenuItem key={keyIndex} value={keyIndex}>{item.title}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="phone-operator-select-label">Статус телефона</InputLabel>
              <Select
                labelId="phone-operator-select-label"
                onChange={handleStatusChange}
                value={filterData.status}
                name="status"
              >
                <MenuItem key={0} value={0}>Номер не обработан</MenuItem>
                {phoneStatus.map((item, keyIndex) =>
                  <MenuItem key={keyIndex} value={keyIndex + 1}>{item}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    currentPhone: state.phones.currentPhone,
    filterData: state.phones.filterData
  }
}

const mapDispatchToProps = {
  saveFilterData
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneFilter)