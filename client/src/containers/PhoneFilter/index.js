import React, { Fragment, useState } from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { telecomOperators, phoneStatus, phonesRange } from '../../lib/selects'
import { connect } from 'react-redux'
import { saveOperatorFilter, saveStatusFilter, saveRangeFilter } from '../../store/phones/actions'

const PhoneFilter = ({ filterData, saveOperatorFilter, saveStatusFilter, saveRangeFilter }) => {
  const [phoneRange, setPhoneRange] = useState(phonesRange[0].range)

  const handleOperatorChange = (e) => {
    saveOperatorFilter(e.target.value)
    setPhoneRange(phonesRange[e.target.value].range)
    saveRangeFilter(0)
  }

  const handleStatusChange = (e) => {
    saveStatusFilter(e.target.value)
  }

  const handleRangeChange = (e) => {
    saveRangeFilter(e.target.value)
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
  saveOperatorFilter,
  saveStatusFilter,
  saveRangeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneFilter)