import C from '../types'

export const showNoty = (data) => {
  return {
    type: C.phoneConst.STORE_NOTY_MESSAGE,
    payload: data
  }
}

export const loadingData = (data) => {
  return {
    type: C.phoneConst.STORE_LOADING_STATE,
    payload: data
  }
}

export const setDialogState = (data) => {
  return {
    type: C.phoneConst.STORE_DIALOG_STATE,
    payload: data
  }
}

export const showDriveDialog = (data) => {
  return {
    type: C.phoneConst.SHOW_DRIVE_DIALOG,
    payload: data
  }
}

export const showSettingsDialog = (data) => {
  return {
    type: C.phoneConst.SHOW_SETTINGS_DIALOG,
    payload: data
  }
}

export const savePhoneData = (data) => {
  return {
    type: C.phoneConst.STORE_PHONE_DATA,
    payload: data
  }
}

export const requestPhone = (data) => {
  return {
    type: C.phoneConst.REQUEST_PHONE_NUMBER,
    payload: data
  }
}

export const freeBusyNumber = (data) => {
  return {
    type: C.phoneConst.FREE_BUSY_NUMBER,
    payload: data
  }
}

export const searchPhoneNumber = (data) => {
  return {
    type: C.phoneConst.SEARCH_PHONE_NUMBER,
    payload: data
  }
}

export const saveFilterData = (data) => {
  return {
    type: C.phoneConst.SAVE_FILTER_DATA,
    payload: data
  }
}

export const updatePhone = (data) => {
  return {
    type: C.phoneConst.UPDATE_PHONE_DATA,
    payload: data
  }
}

// table

export const requestResults = (data) => {
  return {
    type: C.phoneConst.REQUEST_RESULTS_DATA
  }
}