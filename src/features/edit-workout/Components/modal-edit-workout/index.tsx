import { MyButton } from '../../../UI/button/MyButton'
import { ExerciseEditWorkoutModal } from './components/exercise-edit-workout-modal'

import { toggleModal, setDelWorkout, setWorkoutDate } from '../../redux/slice'
import { addWorkout, updateWorkout } from '../../../display-list-workout/redux/slice'
import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'

import { DateSetup } from '../../../../shared/Components/data-setup'

import styles from './index.module.scss'

export const EditWorkoutModal = () => {
    const dispatch = useAppDispatch()

    const { workout, mode } = useAppSelector(state => state.editWorkout)

    if (!workout) {
        return <p>Тренировка не найдена.</p>;
    }

    if (!workout.exercises || workout.exercises.length === 0) {
        return <p>Нет доступных упражнений для редактирования.</p>;
    }

    const handlerUpdateWorkout = () => {
        if (mode == 'copy') {
            dispatch(addWorkout({ ...workout, id: Date.now() }))
            dispatch(toggleModal({ modal: 'mainModalOpen', value: false }))
        }
        else if (mode == 'edit') {
            dispatch(updateWorkout(workout))
            dispatch(toggleModal({ modal: 'mainModalOpen', value: false }))
        }
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setWorkoutDate(date ? date.toISOString() : null));
        } else {
            dispatch(setWorkoutDate(null));
        }
    };

    const handlerDelExercise = (id: number) => {
        dispatch(setDelWorkout(id))

    };

    const openAddWorkoutModal = () => {
        dispatch(toggleModal({ modal: 'addExcersiseOpen', value: true }))
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <DateSetup value={workout.date} onChange={handleDateChange} />
                <MyButton className={styles.btnAddExercise} onClick={openAddWorkoutModal}>Добавить упражнения</MyButton>
            </div>
            <div>
                <table>
                    <tr className={styles.info}>
                        <td>Упражнение</td>
                        <td>Количество подходов</td>
                        <td>Количество повторов</td>
                        <td>Вес</td>
                        <td style={{ minWidth: '50px' }}></td>
                    </tr>
                    {workout.exercises.map((exercise) => (
                        <ExerciseEditWorkoutModal key={exercise.id} exercise={exercise} handlerDelExercise={handlerDelExercise} />
                    ))}
                </table>
            </div>
            <MyButton className={styles.btnOk} onClick={handlerUpdateWorkout}>Готово</MyButton>
        </div>
    )
}


