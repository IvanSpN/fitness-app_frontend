import { useEffect } from "react"
import { setAddExercise, setExercisesListAdd, toggleModal } from "../../redux/slice"
import { useAppDispatch } from '../../../../shared/Redux/store'
import { useAppSelector } from "../../../../shared/Redux/hooks"
import { MyButton } from "../../../UI/button/MyButton"
import { ExerciseAdd } from "./components/exercise-add"


import styles from './index.module.scss'
import { Exercises } from "../../../create-workout/redux/types"

export const AddExerciseToWorkoutModal = () => {

  const dispatch = useAppDispatch()

  const { dataExercisesList } = useAppSelector(state => state.createWorkout)
  const { dataExerciseListAdd } = useAppSelector(state => state.editWorkout)
  const { workout } = useAppSelector(state => state.editWorkout)

  const dataExerciseEdit: Exercises.Types.ExerciseChecked [] = dataExercisesList.map(({ uuid, name, isWeight, }) => ({
    uuid,
    name,
    isWeight,
    checked: false,
  }));

  const filterDataExercise = dataExerciseEdit.filter((exercise) => !workout?.exercises.some((workoutExercise) => workoutExercise.exercise_uuid === exercise.uuid));

  const prepareCheckedExercises = (exerciseList: Exercises.Types.ExerciseChecked[]): Exercises.Response.WorkoutExercise []=> {
    return exerciseList.filter((exercise) => exercise.checked).map(({ uuid, name, isWeight }) => ({
      exercise_uuid: uuid,
      uuid,
      name,
      isWeight,
      sets: 0,
      reps: 0,
      weight: 0,
      exercise: {name}
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
