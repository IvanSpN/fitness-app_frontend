import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './index.module.scss'

interface DateSetupProps {
  value: string | null,
  onChange: (date: Date | null) => void;
}

export const DateSetup: React.FC<DateSetupProps> = ({value, onChange}) => {

  const handleDateChange = (date: Date | null) => {
    onChange(date);
  };

  return (
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={handleDateChange}
        dateFormat="dd.MM.yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="Выберите дату"
      />
  )
}


