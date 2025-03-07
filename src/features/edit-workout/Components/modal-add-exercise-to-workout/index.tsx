import { useEffect } from "react"
import { setAddExercise, setExercisesListAdd, toggleModal } from "../../redux/slice"
import { useAppDispatch } from '../../../../shared/Redux/store'
import { useAppSelector } from "../../../../shared/Redux/hooks"
import { MyButton } from "../../../UI/button/MyButton"
import { ExerciseAdd } from "./components/exercise-add"

import { IAddExersice, IAddExersiceWithChecked } from "../../redux/types"

import styles from './index.module.scss'

export const AddExerciseToWorkoutModal = () => {

  const dispatch = useAppDispatch()

  const { dataExercisesList } = useAppSelector(state => state.createWorkout)
  const { dataExerciseListAdd } = useAppSelector(state => state.editWorkout)
  const { workout } = useAppSelector(state => state.editWorkout)

  const dataExerciseEdit: IAddExersiceWithChecked[] = dataExercisesList.map(({ uuid, name, isWeight }) => ({
    uuid,
    name,
    isWeight,
    checked: false,
  }));

  const filterDataExercise = dataExerciseEdit.filter((exercise) => !workout?.exercises.some((workoutExercise) => workoutExercise.exercise_uuid === exercise.uuid));

  const prepareCheckedExercises = (exerciseList: IAddExersiceWithChecked[]) => {
    return exerciseList.filter((exercise) => exercise.checked).map(({ uuid, name,  }) => ({
      exercise_uuid: uuid,
      name,
      sets: 0,
      reps: 0,
      weight: 0,
    }))
  }

  useEffect(() => {
    dispatch(setExercisesListAdd(filterDataExercise))
  }, [])

  const handlerCloseModal = () => {
    dispatch(toggleModal({ modal: 'addExcersiseOpen', value: false }))
    dispatch(setAddExercise(prepareCheckedExercises(dataExerciseListAdd)))
  }

  return (
    <div >
      <p>Модалка для добавления упражнения</p>
      {dataExerciseListAdd.map((exercise) => <ExerciseAdd key={exercise.uuid} name={exercise.name} uuid={exercise.uuid} isChecked={exercise.checked} />)}
      <MyButton onClick={handlerCloseModal}>Готово</MyButton>
    </div>
  )
}
