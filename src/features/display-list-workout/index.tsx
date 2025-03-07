import dayjs from 'dayjs';
import { useAppSelector } from '../../shared/Redux/hooks';
import { Workout } from './Components/workout/index';

import styles from './index.module.scss'
import { useEffect } from 'react';
import { useAppDispatch } from '../../shared/Redux/store';
import { fetchWorkoutsAPI } from './redux/thuks';

export const DisplayListWorkout = () => {

  const today = dayjs();
  const dispatch = useAppDispatch()

  const { workouts } = useAppSelector(state => state.displayListWorkout)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchWorkoutsAPI()).unwrap();
        console.log('Получены все тренировки:', data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Ошибка при загрузке:', err.message);
        } else {
          console.error('Неизвестная ошибка:', err);
        }
      }
    };
    fetchData();
  }, [dispatch,])

  const soretdWorkouts = [...workouts].sort((a, b) => (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.todayDate}>Сегодня: {today.format('DD MMMM YYYY')}</h3>
      {soretdWorkouts.length > 0 ? soretdWorkouts.map((workout) => <Workout key={workout.uuid} date={workout.date} uuid={workout.uuid} exercises={workout.exercises} intensity={workout.intensity} type={workout.type} isSkip={workout.isSkip}/>) : 'Почему то список тренировок пуст. Немедленно добавьте тренировки!'}
    </div>
  )
}
