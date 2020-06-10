export const updatePhonesData = (data) => {
  return data.phones
}

export const updateFetchedPhoneData = (data) => {
  return data
}

export const updateFatchedPhoneData = (data) => {
  const phone = {
    id: data.id,
    phone: data.phone
  }
  return phone
}

export const updateFindPhone = (data) => {
  return data[0]
}

export const updateResults = (data) => {
  return data.phones
}