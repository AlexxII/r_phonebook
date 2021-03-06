import React, { forwardRef, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { PollSelect } from '../../containers';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const localData = {
  header: {
    actions: 'Действия'
  },
  toolbar: {
    searchTooltip: 'Поиск',
    searchPlaceholder: 'Поиск',
    exportTitle: 'Экспорт'
  },
  pagination: {
    labelRowsSelect: 'строк',
    firstTooltip: 'Первая страница',
    previousTooltip: 'Предыдущая страница',
    nextTooltip: 'Следующая страница',
    lastTooltip: 'Последняя страница'
  },
  body: {
    addTooltip: 'Добавить',
    deleteTooltip: 'Удалить',
    editTooltip: 'Редактировать',
    editRow: {
      deleteText: 'Вы уверены, что хотите удалить данную строку?',
      saveTooltip: 'Сохранить',
      cancelTooltip: 'Отменить'
    }
  }
}

const Table = ({ data }) => {
  const [state, setState] = useState({
    columns: [
      {
        title: 'Телефон',
        field: 'phone',
        editable: 'onAdd'
      },
      {
        title: 'Статус',
        field: 'status',
        lookup: {
          '0': 'Номер не обработан',
          '1': 'Номер не существует',
          '2': 'Неправильный набор номера',
          '3': 'Данный вид связи недоступен',
          '4': 'Данный номер не обслуживается',
          '5': 'Абонент в сети не зарагистрирован',
          '6': 'Абонент временно заблокирован',
          '7': 'Короткие гудки',
          '8': 'Вызов не может быть установлен',
          '9': 'Абонент временно недоступен',
          '10': 'Телефон принадлежит организации',
          '11': 'Телефон несовершеннолетнего',
          '12': 'Телефон существует, но занят',
          '13': 'Телефон существует, но не берет трубку',
          '14': 'Перезвонить позднее',
          '15': 'Респондент отказался отвечать',
          '16': 'Успех'
        }
      },
      {
        title: 'Пол',
        field: 'sex',
        lookup: {
          140: 'Мужской',
          141: 'Женский'
        }
      },
      {
        title: 'Возраст',
        field: 'age'
      },
      {
        title: 'Категория населенного пункта',
        field: 'town',
        lookup: {
          130: 'город с численностью более 1 млн чел.',
          131: 'город с численностью от 500 тыс. чел. до 1 млн чел.',
          132: 'город с численностью от 100 до 500 тыс. чел.',
          133: 'город с численностью 50 до 100 тыс. чел.',
          134: 'город с численностью до 50 тыс. чел., поселок городского типа',
          135: 'сельский населенный пункт'
        }
      },
      {
        title: 'Примечание',
        field: 'comment'
      }
    ]
  });

  return (
    <MaterialTable
      options={{
        exportButton: true,
        showTitle: false,
        pageSizeOptions: [5, 20, 40, 200, 400, 800]
      }}
      icons={tableIcons}
      localization={localData}
      columns={state.columns}
      data={data}
    />
  );
}

export default Table