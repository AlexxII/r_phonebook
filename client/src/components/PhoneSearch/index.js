import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

import Badge from '@material-ui/core/Badge';



import { connect } from 'react-redux'
import { searchPhoneNumber, showDriveDialog } from '../../store/phones/actions'

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['8', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const PhoneSearch = ({ searchPhoneNumber, findPhone, showDriveDialog }) => {
  const [values, setValues] = React.useState({
    textmask: '8(  )   -  -  '
  });

  const [error, setError] = React.useState(false)
  const phoneRegex = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/

  const handlePhoneSearch = () => {
    const value = values.textmask
    if (value.match(phoneRegex)) {
      searchPhoneNumber(value)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handlePhoneFound = () => {
    const phone = {
      ...findPhone.phone,
      search: true
    }
    showDriveDialog(phone)
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Fragment>
      <Grid container spacing={0} className="phone-search">
        <Grid item xs={8} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel error={error} htmlFor="formatted-text-mask-input">Поиск номера</InputLabel>
            <Input
              error={error}
              value={values.textmask}
              onChange={handleChange}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2} sm={1} md={1}>
          <IconButton
            onClick={handlePhoneSearch}
          >
            <SearchIcon />
          </IconButton>
          {findPhone.success &&
            <IconButton
              onClick={handlePhoneFound}
            >
              <Badge badgeContent={1} color="default">
                <PhoneAndroidIcon style={{ fill: "green" }} />
              </Badge>
            </IconButton>
          }
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    findPhone: state.phones.findPhone
  }
}
const mapDispatchToProps = {
  searchPhoneNumber,
  showDriveDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneSearch)