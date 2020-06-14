import 'regenerator-runtime/runtime'
import { takeEvery, takeLatest, put, call, all, select } from 'redux-saga/effects'
import { updatePhonesData, updateFindPhone, updateFetchedPhoneData, updateResults, updateCodes } from '../../lib/phonesUpdate'
import { showNoty, setDialogState, loadingData, dropNewPollData, requestPollCodes } from '../../store/phones/actions'
import C from '../types';

export function* watchPollCodesFetch() {
  yield takeEvery(C.phoneConst.REQUEST_POLL_CODES, requestPollCodesEx)
}

export function* watchNewPollSave() {
  yield takeEvery(C.phoneConst.SAVE_NEW_POLL, saveNewPoll)
}

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

export function* watchResultsRequest() {
  yield takeEvery(C.phoneConst.REQUEST_RESULTS_DATA, requestResults)
}

export default function* rootSage() {
  yield all([
    // Внимание с ()!!!!
    watchDialogFetch(),
    watchFreeBusyNumber(),
    watchPhoneSearch(),
    watchPhoneUpdate(),
    watchResultsRequest(),
    watchPollCodesFetch(),
    watchNewPollSave()
  ])
}

/*
67 ~50-51 %
точно 45%
скорее 22% 2/3 -врут
задача - уйти за 50%, за 55% - крутяк
прогноз ВЦИОМ за - 71%
*/

function* showDriveDialog(data) {
  try {
    // найти и сохранить в сторе случайный номер
    if (!data.payload.id) {
      const fetchedPhoneData = yield call(fetchPhoneData, data.payload)
      const resp = updateFetchedPhoneData(fetchedPhoneData)
      if (!resp.error) {
        yield put({ type: C.phoneConst.STORE_CURRENT_PHONE, payload: resp })
        yield put(setDialogState(true))
      } else {
        if (!resp.serverError) {
          const noty = {
            variant: 'error',
            duration: 1500,
            text: 'Телефонов, согласно запроса не найдено'
          }
          yield put(showNoty(noty))
        } else {
          const noty = {
            variant: 'error',
            duration: 1500,
            text: 'Ошибка сервера. Смотрите лог.'
          }
          yield put(showNoty(noty))
          console.log(resp.message)
        }
      }
    } else {
      // сохранить в стор найденный ранее номер
      const phoneData = data.payload
      yield put({ type: C.phoneConst.STORE_CURRENT_PHONE, payload: phoneData })
      yield put(setDialogState(true))
    }
  } catch (e) {
    const noty = {
      variant: 'error',
      duration: 1500,
      text: 'Ошибка сервера. Смотрите лог.'
    }
    yield put(showNoty(noty))
    console.log(e);
  }
  yield put(loadingData(false))
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
        duration: 2000,
        text: 'Телефон не найден в БД'
      }
      yield put(showNoty(noty))
    }
  } catch (e) {
    const noty = {
      variant: 'error',
      duration: 2500,
      text: 'Ошибка сервера. Смотрите лог.'
    }
    yield put(showNoty(noty))
    console.log(e);
  }
  yield put(loadingData(false))
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
    const payload = data.payload
    yield call(updatePhoneNumber, payload)
    if (payload.search) {
      yield put({ type: C.phoneConst.RESTORE_FIND_NUMBER, payload })
    }
    const noty = {
      variant: 'success',
      duration: 1500,
      text: 'Обновления сохранены в БД'
    }
    yield put(showNoty(noty))
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
// получение пула адресов для Results
function* requestResults() {
  try {
    const fetchedResults = yield call(fetchResults)
    const phones = updateResults(fetchedResults)
    yield put({ type: C.phoneConst.STORE_RESULTS, payload: phones })
  } catch (e) {
    const noty = {
      variant: 'error',
      duration: 2500,
      text: 'Ошибка сервера. Смотрите лог.'
    }
    yield put(showNoty(noty))
    console.log(e);
  }
}
async function fetchResults() {
  let config = {
    headers: { mode: 'no-cors' }
  };
  const response = await fetch('http://localhost:3000/phones', config)
  return await response.json()
}
// получение кодов опросов на Home
function* requestPollCodesEx() {
  try {
    const fetchedCodes = yield call(fetchCodes)
    const phones = updateCodes(fetchedCodes)
    yield put({ type: C.phoneConst.STORE_POLL_CODES, payload: phones })
  } catch (e) {
    const noty = {
      variant: 'error',
      duration: 2500,
      text: 'Ошибка сервера. Начать опрос не получится. Смотрите лог.'
    }
    yield put(showNoty(noty))
    console.log(e);
  }
}
async function fetchCodes() {
  let config = {
    headers: { mode: 'no-cors' }
  };
  const response = await fetch('http://localhost:3000/poll-codes', config)
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

// сохранить новый опрос
function* saveNewPoll() {
  try {
    const state = yield select();
    yield call(sendNewPoll, state.phones.newPoll)
    const noty = {
      variant: 'success',
      duration: 2500,
      text: 'Код нового опроса добавлен.'
    }
    yield put(showNoty(noty))
    yield put(requestPollCodes())
    yield put(dropNewPollData())
  } catch (e) {
    const noty = {
      variant: 'error',
      duration: 2500,
      text: 'Ошибка сервера. Смотрите лог.'
    }
    yield put(showNoty(noty))
    yield put(dropNewPollData())
    console.log(e);
  }
}
async function sendNewPoll(data) {
  let config = {
    headers: { mode: 'no-cors' }
  };
  const sql = 'http://localhost:3000/save-new-poll?title=' + data.title + '&code=' + data.code + '&comment=' + data.comment
  const response = await fetch(sql, config)
  return await response.json()
}