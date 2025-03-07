import React, { ChangeEvent, FocusEventHandler, forwardRef } from 'react';
import styles from './MyInput.module.scss';


export type TInputValue = string | number | boolean;
interface MyInputProps {
  label?: string;
  placeholder?: string;
  type: 'text' | 'number' | 'checkbox';
  className?: string;
  onChange: (value: string | number | boolean ) => void;
  value?: TInputValue
  id?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  ({ label, placeholder, type, className = '', onChange, value, id = `input-${Math.random().toString(36).substr(2, 9)}`,onFocus, onBlur }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (type === 'checkbox') {
        onChange(e.target.checked);
      } else if (type === 'number') {
        const newValue = e.target.value === '' ? '' : parseFloat(e.target.value);
        onChange(newValue);
      } else {
        onChange(e.target.value);
      }
    };

    const inputProps =
      type === 'checkbox'
        ? {
            checked: value as boolean,
            onChange: handleChange,
          }
        : {
            value: value as string | number,
            onChange: handleChange,
          };

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label
            htmlFor={id}
            className={styles.label}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          {...inputProps}
          type={type}
          placeholder={placeholder}
          className={`${styles.myInput} ${className}`}
          ref={ref}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    );
  }
);


