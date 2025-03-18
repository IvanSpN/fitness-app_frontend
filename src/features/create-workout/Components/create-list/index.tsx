import dayjs from 'dayjs'
import 'dayjs/locale/ru';
dayjs.locale('ru');
import { v4 as uuidv4 } from 'uuid';


import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'

import { MyButton } from '../../../UI/button/MyButton'
import { DateSetup } from '../../../../shared/Components/data-setup'

import { setIntensity, setType, submitForm } from '../../redux/slice'
import { deleteDate, setDate } from '../../redux/slice'

import { CreateItem } from './components/create-item'


import styles from './index.module.scss'
import Select from 'rc-select';
import { createWorkoutAPI } from '../../redux/thunks';
import { Workouts } from '../../redux/types';

export const optionsIntensity = ['легкая', 'средняя', 'тяжелая']
export const optionsType = ['силовая', 'беговая', 'с собственным весом', 'круговая']

export const CreateList = () => {

    const dispatch = useAppDispatch()

    const {  workout, dateCreateWorkout  } = useAppSelector(state => state.createWorkout)
    const {   workouts } = useAppSelector(state => state.displayListWorkout)

    const today = dayjs();

    const onCreate = () => {

        const newWorkout: Workouts.Dto.Create = {
            ...workout,
            uuid: uuidv4(),
            type: workout.type,
            intensity: workout.intensity,
            date: workout.date,
            isSkip: false,
            isDone: false,
            user_uuid: "5ea9205f-aff3-48a5-b865-23c872829198"
        }

        dispatch(createWorkoutAPI(newWorkout))
        dispatch(submitForm())
        dispatch(setDate(null))
        dispatch(setIntensity(optionsIntensity[0]))
        dispatch(setType(optionsType[0]))
    }

    const handlerDeleteAll = () => {
        dispatch(deleteDate())
        dispatch(setIntensity(optionsIntensity[0]))
        dispatch(setType(optionsType[0]))

    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setDate(date.toISOString()));
        } else {
            dispatch(setDate(null));
        }
    };

    const handleChangeIntensity = (value: string) => {
        dispatch(setIntensity(value))
    }
    const handleChangeType = (value: string) => {
        dispatch(setType(value))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.topHeader}>
                    <h2>Собираем тренировку</h2>
                    <h3 className={styles.todayDate}>Сегодня: {today.format('DD MMMM YYYY')}</h3>
                </div>
                <div>
                    <h3>Тренировка на дату:</h3>
                    <DateSetup value={dateCreateWorkout} onChange={handleDateChange} />
                    {(workouts.length > 0 || dateCreateWorkout) && <MyButton className={styles.btn_dellAll} onClick={handlerDeleteAll}>Удалить всё</MyButton>
                    }
                </div>
                <div className={styles.selectBlock}>
                    {workout.exercises.length > 0 && <div className={styles.intensityBlock}>
                        <label htmlFor="intensity-select">Интенсивность тренировки:</label>
                        <Select
                            id="intensity-select"
                            value={workout.intensity}
                            onChange={handleChangeIntensity}
                            showSearch
                            options={optionsIntensity.map(option => ({ value: option, label: option }))}
                        />
                    </div>}
                    {workout.exercises.length > 0 && <div className={styles.intensityBlock}>
                        <label htmlFor="intensity-select">Тип тренировки:</label>
                        <Select
                            id="intensity-select"
                            value={workout.type}
                            onChange={handleChangeType}
                            showSearch
                            options={optionsType.map(option => ({ value: option, label: option }))}
                        />
                    </div>}
                </div>
            </div>
            <div className={styles.create_exercise_wrapper}>
                {workout.exercises.map((exercise, index) =>
                    <CreateItem exercise={exercise} key={exercise.exercise_uuid} index={index} />

                )}
            </div>
            {workout.exercises.length > 0 && <MyButton className={styles.button_ok} onClick={onCreate}>Добавить тренировку</MyButton>
            }
        </div>
    )
}
