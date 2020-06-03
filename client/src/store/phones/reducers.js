import C from '../types'
import produce from 'immer'

const defaultState = {
  phones: [],
  currentPhone: {},
  filterData: {
    operator: 0,
    range: 0,
    status: 0
  },
  findPhone: {
    phone: {},
    success: false
  },
  phoneDialog: {
    open: false
  },
  noty: {
    firstInit: true,
    variant: 'info',
    duration: 1500,
    text: ''
  }
}

export const phonesReducer = (state = defaultState, action) => {
  switch (action.type) {
    // case C.phoneConst.STORE_PHONES_DATA:
    //   state = {
    //     ...state,
    //     phones: action.payload
    //   }
    //   return state
    case C.phoneConst.SAVE_OPERATOR_FILTER:
      const operator = action.payload
      return produce(state, draft => {
        draft.filterData.operator = operator
      })
    case C.phoneConst.SAVE_RANGE_FILTER:
      const range = action.payload
      return produce(state, draft => {
        draft.filterData.range = range
      })
    case C.phoneConst.SAVE_STATUS_FILTER:
      const status = action.payload
      return produce(state, draft => {
        draft.filterData.status = status
      })
    case C.phoneConst.STORE_CURRENT_PHONE:
      return produce(state, draft => {
        draft.currentPhone = action.payload
      })
    case C.phoneConst.STORE_PHONE_DATA:
      const type = action.payload.type
      const data = action.payload.data
      return produce(state, draft => {
        draft.currentPhone[type] = data
      })
    case C.phoneConst.FREE_BUSY_IN_STORE:
      return produce(state, draft => {
        draft.currentPhone = {}
      })
    case C.phoneConst.STORE_FIND_NUMBER:
      return produce(state, draft => {
        draft.findPhone.phone = action.payload
        draft.findPhone.success = true
      })
    case C.phoneConst.RESTORE_FIND_NUMBER:
      return produce(state, draft => {
        draft.findPhone.phone = action.payload
      })
    case C.phoneConst.PHONE_FIND_FAILED:
      return produce(state, draft => {
        draft.findPhone.success = false
      })
    case C.phoneConst.STORE_NOTY_MESSAGE:
      return produce(state, draft => {
        draft.noty = action.payload
      })
    case C.phoneConst.STORE_DIALOG_STATE:
      return produce(state, draft => {
        draft.phoneDialog.open = action.payload
      })
    case C.phoneConst.UPDATE_PHONE:
      return {
        ...state,
        phones: action.payload
      }
    default: return state
  }
}