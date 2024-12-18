import { useEffect } from "react"

import exercisesList from "../../../../data/DB"

import { IAddExersice, setAddExercise, setExercisesListAdd, toggleModal } from "../../redux/slice"
import { useAppDispatch } from '../../../../shared/Redux/store'
import { useAppSelector } from "../../../../shared/Redux/hooks"
import { MyButton } from "../../../UI/button/MyButton"
import { ExerciseAdd } from "./components/exercise-add"

import styles from './index.module.scss'

export const AddExerciseModal = () => {

  const dispatch = useAppDispatch()

  const { dataExerciseListAdd } = useAppSelector(state => state.editWorkout)
  const { workout } = useAppSelector(state => state.editWorkout)

  const dataExerciseEdit = exercisesList.map(({ id, name, config: { sets, reps, weight, extraWeight } }) => ({
    id,
    name,
    sets,
    reps,
    weight: weight ?? 0, // если значение weight отсутствует, подставить 0
    extraWeight: extraWeight ?? 0, // если значение extraWeight отсутствует, подставить 0
    checked: false,
  }))

  const filterDataExercise = dataExerciseEdit.filter((exercise) => !workout?.exercises.some((workoutExercise) => workoutExercise.id === exercise.id));

  const getCheckedExercises = (exerciseList: IAddExersice[]) => {
    return exerciseList.filter((exercise) => exercise.checked).map(({ id, name, sets, reps, weight }) => ({
      id,
      name,
      sets,
      reps,
      weight,
    }))
  }

  useEffect(() => {
    dispatch(setExercisesListAdd(filterDataExercise))
  }, [])

  const handlerCloseModal = () => {
    dispatch(toggleModal({ modal: 'addExcersiseOpen', value: false }))
    dispatch(setAddExercise(getCheckedExercises(dataExerciseListAdd)))
  }

  return (
    <div >
      <p>Модалка для добавления упражнения</p>
      {dataExerciseListAdd.map((exercise) => <ExerciseAdd key={exercise.id} name={exercise.name} id={exercise.id} isChecked={exercise.checked} />)}
      <MyButton onClick={handlerCloseModal}>Готово</MyButton>
    </div>
  )
}
