import React, { useEffect } from 'react'
import { Table } from '../../components'
import { connect } from 'react-redux'
import { requestPhoneBook } from '../../store/phones/actions'
import { megafon, beeline, mts, tele2 } from '../../lib/phones'
import { Dialog } from '../../components'


const PhoneTableWrap = ({ requestPhoneBook, data }) => {
  useEffect(() => {
    requestPhoneBook()
  }, [])

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function formatPhoneNumber(num) {
    let str = num.toString()
    let match = str.match(/^8(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return 8 + '(' + match[1] + ')' + match[2] + '-' + match[3] + '-' + match[4]
    };
    return null
  }

  const generatorFun = () => {
    const range = tele2[0];
    const length = 1000
    let result = []
    for (let i = 0; i < length; i++) {
      let temp = randomIntFromInterval(range[0], range[1])
      result[i] = formatPhoneNumber(temp)
    }
    let uniqueResult = result.filter((v, i, a) => a.indexOf(v) === i);
    console.log(uniqueResult);
    console.log(uniqueResult.length);
  }

  return (
    <div>
      <button onClick={generatorFun}>Генерировать</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    data: state.phones
  }
}
const mapDispatchToProps = {
  requestPhoneBook
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTableWrap);