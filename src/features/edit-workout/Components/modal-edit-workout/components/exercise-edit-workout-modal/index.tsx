import { Exercises } from '../../../../../create-workout/redux/types';
import { MyButton } from '../../../../../UI/button/MyButton'
import { ExerciseCounter } from './components/exercise-counter'

import styles from './index.module.scss'
interface ExerciseModalProps {
    exercise: Exercises.Response.WorkoutExercise,
    handlerDelExercise: (uuid: string) => void,
}

export const ExerciseEditWorkoutModal: React.FC<ExerciseModalProps> = ({ exercise, handlerDelExercise }) => {

    return (
        <tr className={styles.wrapper}>
            <td>{exercise.exercise.name}</td>
            <ExerciseCounter key={exercise.exercise_uuid} exercise={exercise} />
            <MyButton onClick={() => handlerDelExercise(exercise.exercise_uuid)}>del</MyButton>
        </tr>
    )
}
