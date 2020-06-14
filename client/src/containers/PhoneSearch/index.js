import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';

import { connect } from 'react-redux'
import { searchPhoneNumber, showDriveDialog, loadingData } from '../../store/phones/actions'

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

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const PhoneSearch = ({ searchPhoneNumber, findPhone, showDriveDialog, loadingData, loading }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    textmask: '8(  )   -  -  '
  });
  const [error, setError] = React.useState(false)
  const phoneRegex = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/

  const handlePhoneSearch = () => {
    const value = values.textmask
    if (value.match(phoneRegex)) {
      loadingData(true)
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
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
            <FormHelperText>Не учитывает код опроса при поиске</FormHelperText>
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
    loading: state.phones.loading,
    findPhone: state.phones.findPhone
  }
}
const mapDispatchToProps = {
  searchPhoneNumber,
  showDriveDialog,
  loadingData
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneSearch)