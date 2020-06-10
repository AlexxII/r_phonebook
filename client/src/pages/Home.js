import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { PhoneFilter, HomeBar, DriveIn } from '../containers'
import { PhoneSearch } from '../components'
import { showSettingsDialog } from '../store/phones/actions'

const Home = ({ showSettingsDialog }) => {

  const handleMenu = (e) => {
    showSettingsDialog(true)
    console.log(e);
  }

  return (
    <Fragment>
      <HomeBar menuHndl={handleMenu} />
      <PhoneSearch />
      <PhoneFilter />
      <DriveIn />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    data: state.phones
  }
}
const mapDispatchToProps = {
  showSettingsDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)