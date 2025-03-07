import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkoutsAPI = createAsyncThunk(
  'workouts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const {data} = await axios.get('http://localhost:5050/api/workouts');
      return data;
    } catch (error: unknown) {
      // Используем axios.isAxiosError для проверки, является ли ошибка ошибкой от axios
      if (axios.isAxiosError(error)) {
        // Если это ошибка от axios, то можно получить доступ к свойствам ошибки
        console.error('Ошибка при запросе:', error.message);
        return rejectWithValue(error.response?.data || error.response?.statusText || 'Ошибка на сервере');
      } else if (error instanceof Error) {
        // Если ошибка - обычная ошибка JavaScript
        return rejectWithValue(error.message);
      } else {
        // Если ошибка неизвестного типа
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export const deleteWorkoutAPI = createAsyncThunk(
  'workout/deleteOne',
  async (uuid: string, { rejectWithValue }) => {
    try {
       await axios.delete(`http://localhost:5050/api/workouts/${uuid}`);
      return uuid;
    } catch (error: unknown) {
      // Используем axios.isAxiosError для проверки, является ли ошибка ошибкой от axios
      if (axios.isAxiosError(error)) {
        // Если это ошибка от axios, то можно получить доступ к свойствам ошибки
        console.error('Ошибка при запросе:', error.message);
        return rejectWithValue(error.response?.data || error.response?.statusText || 'Ошибка на сервере');
      } else if (error instanceof Error) {
        // Если ошибка - обычная ошибка JavaScript
        return rejectWithValue(error.message);
      } else {
        // Если ошибка неизвестного типа
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);
export const markSkipWorkout = createAsyncThunk(
  'workout/markSkip',
  async (uuid: string, { rejectWithValue }) => {
    try {
       await axios.patch(`http://localhost:5050/api/workouts/${uuid}/toggle-skip/`);
      return uuid;
    } catch (error: unknown) {
      // Используем axios.isAxiosError для проверки, является ли ошибка ошибкой от axios
      if (axios.isAxiosError(error)) {
        // Если это ошибка от axios, то можно получить доступ к свойствам ошибки
        console.error('Ошибка при запросе:', error.message);
        return rejectWithValue(error.response?.data || error.response?.statusText || 'Ошибка на сервере');
      } else if (error instanceof Error) {
        // Если ошибка - обычная ошибка JavaScript
        return rejectWithValue(error.message);
      } else {
        // Если ошибка неизвестного типа
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);


