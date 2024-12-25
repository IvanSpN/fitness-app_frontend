import dayjs from 'dayjs';
import { useAppSelector } from '../../shared/Redux/hooks';
import { Workout } from './Components/workout/index';

import styles from './index.module.scss'

export const DisplayListWorkout = () => {

    const today = dayjs();

    const { workouts } = useAppSelector(state => state.displayListWorkout)

    const soretdWorkouts = [...workouts].sort((a, b) => (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0));

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.todayDate}>Сегодня: {today.format('DD MMMM YYYY')}</h3>
            {soretdWorkouts.length > 0 ? soretdWorkouts.map((workout) => <Workout key={workout.id} date={workout.date} id={workout.id} exercises={workout.exercises} intensity={workout.intensity} type={workout.type}/>) : 'Почему то список тренировок пуст. Немедленно добавьте тренировки!'}
        </div>
    )
}
