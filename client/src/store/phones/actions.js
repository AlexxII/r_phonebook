import C from '../types'

export const showNoty = (data) => {
  return {
    type: C.phoneConst.STORE_NOTY_MESSAGE,
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

export const saveOperatorFilter = (data) => {
  return {
    type: C.phoneConst.SAVE_OPERATOR_FILTER,
    payload: data
  }
}

export const saveRangeFilter = (data) => {
  return {
    type: C.phoneConst.SAVE_RANGE_FILTER,
    payload: data
  }
}

export const saveStatusFilter = (data) => {
  return {
    type: C.phoneConst.SAVE_STATUS_FILTER,
    payload: data
  }
}

export const updatePhone = (data) => {
  return {
    type: C.phoneConst.UPDATE_PHONE_DATA,
    payload: data
  }
}