// import React, { useState } from 'react'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import { useAppSelector } from '../../shared/Redux/hooks';
// import { setDate } from './redux/slice';
// import { useDispatch } from 'react-redux';

// import styles from './DataSetup.module.scss'

// export const DataSetup = () => {

//   const dispatch = useDispatch()

//   const { dateState } = useAppSelector(state => state.dataSetup)

//   const handleDateChange = (date: Date | null) => {
//     if (date) {
//       dispatch(setDate(date.toISOString()));
//       console.log(date.toISOString())
//     } else {
//       dispatch(setDate(null));
//     }
//   };


//   return (
//     <div>Тренировка на дату:
//       <DatePicker
//         selected={dateState ? new Date(dateState) : null}
//         onChange={handleDateChange}
//         dateFormat="dd.MM.yyyy"
//         showMonthDropdown
//         showYearDropdown
//         dropdownMode="select"
//         placeholderText="Выберите дату"
//       />
//     </div>
//   )
// }


