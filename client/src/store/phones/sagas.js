import 'regenerator-runtime/runtime'
import { takeEvery, takeLatest, put, call, all, select } from 'redux-saga/effects'
import { updatePhonesData, updateFindPhone, updateFetchedPhoneData } from '../../lib/phonesUpdate'
import { showNoty, setDialogState } from '../../store/phones/actions'
import C from '../types';

export function* watchDialogFetch() {
  yield takeEvery(C.phoneConst.SHOW_DRIVE_DIALOG, showDriveDialog)
}

export function* watchFreeBusyNumber() {
  yield takeEvery(C.phoneConst.FREE_BUSY_NUMBER, freeBusyNumber)
}

export function* watchPhoneSearch() {
  yield takeEvery(C.phoneConst.SEARCH_PHONE_NUMBER, searchPhone)
}

export function* watchPhoneUpdate() {
  yield takeEvery(C.phoneConst.UPDATE_PHONE_DATA, updatePhoneData)
}

export default function* rootSage() {
  yield all([
    // Внимание с ()!!!!
    watchDialogFetch(),
    watchFreeBusyNumber(),
    watchPhoneSearch(),
    watchPhoneUpdate()
  ])
}

function* showDriveDialog(data) {
  try {
    // найти и сохранить в сторе случайный номер
    if (!data.payload.id) {
      const fetchedPhoneData = yield call(fetchPhoneData, data.payload)
      const phone = updateFetchedPhoneData(fetchedPhoneData)
      if (!phone.error) {
        yield put({ type: C.phoneConst.STORE_CURRENT_PHONE, payload: phone })
        yield put(setDialogState(true))
      } else {
        const noty = {
          variant: 'error',
          duration: 1500,
          text: 'Телефонов, согласно запроса не найдено'
        }
        yield put(showNoty(noty))
      }
    } else {
      // сохранить в стор найденный ранее номер
      const phoneData = data.payload
      yield put({ type: C.phoneConst.STORE_CURRENT_PHONE, payload: phoneData })
      yield put(setDialogState(true))
    }
  } catch (e) {
    console.log(e);
  }
}

async function fetchPhoneData(data) {
  let config = {
    method: 'GET',
    headers: { mode: 'no-cors' }
  };
  const operator = data.operator
  const range = data.range
  const status = data.status
  const url = 'http://localhost:3000/phone?operator=' + operator + '&range=' + range + '&status=' + status
  const response = await fetch(url, config)
  return await response.json()
}

// освобождение занятого номера
function* freeBusyNumber(data) {
  try {
    const id = data.payload
    yield call(setNumberFree, id)
    yield put({ type: C.phoneConst.FREE_BUSY_IN_STORE })
    const noty = {
      variant: 'info',
      duration: 1500,
      text: 'Телефон возвращен в базу данных'
    }
    yield put(showNoty(noty))
  } catch (e) {
    console.log(e);
  }
}
async function setNumberFree(id) {
  let config = {
    method: 'GET',
    headers: { mode: 'no-cors' }
  };
  const url = 'http://localhost:3000/free-busy?id=' + id
  const response = await fetch(url, config)
  return await response.json()
}

// найти и сохранить в store номер
function* searchPhone(data) {
  try {
    const phone = data.payload
    const findPhone = yield call(searchPhoneOnServer, phone)
    if (findPhone.length) {
      const updatedPhone = updateFindPhone(findPhone)
      yield put({ type: C.phoneConst.STORE_FIND_NUMBER, payload: updatedPhone })
    } else {
      yield put({ type: C.phoneConst.PHONE_FIND_FAILED })
      const noty = {
        variant: 'error',
        duration: 1500,
        text: 'Телефон не найден в БД'
      }
      yield put(showNoty(noty))
    }
  } catch (e) {
    console.log(e);
  }
}
async function searchPhoneOnServer(phone) {
  let config = {
    method: 'GET',
    headers: { mode: 'no-cors' }
  };
  const url = 'http://localhost:3000/phone-search?phone=' + phone
  const response = await fetch(url, config)
  return await response.json()
}

function* updatePhoneData(data) {
  try {
    console.log(data.payload);
    const payload = data.payload
    yield call(updatePhoneNumber, payload)
    if (payload.search) {
      yield put({ type: C.phoneConst.RESTORE_FIND_NUMBER, payload })
    }
    yield put(setDialogState(false))
  } catch (e) {
    console.log(e);
  }
}
async function updatePhoneNumber(data) {
  let config = {
    method: 'GET',
    headers: { mode: 'no-cors' }
  };
  const url = 'http://localhost:3000/update?id=' + data.id + '&status=' +
    data.status + '&sex=' + data.sex + '&age=' + data.age + '&town=' + data.town + '&comment=' + data.comment
  const response = await fetch(url, config)
  return await response.json()
}

// извлечь множество номеров с сервера (для таблицы)
function* fetchData() {
  try {
    const fetchedPhonesData = yield call(fetchPhonesData)
    const phones = updatePhonesData(fetchedPhonesData)
    yield put({ type: C.phoneConst.STORE_PHONES_DATA, payload: phones })
  } catch (e) {
    console.log(e);
  }
}
async function fetchPhonesData() {
  let config = {
    headers: { mode: 'no-cors' }
  };
  const response = await fetch('http://localhost:3000/phones', config)
  return await response.json()
}