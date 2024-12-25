import { IExercise } from '../../../../../create-workout/redux/slice'
import { MyButton } from '../../../../../UI/button/MyButton'
import { ExerciseCounter } from './components/exercise-counter'

import styles from './index.module.scss'
interface ExerciseModalProps {
    exercise: IExercise,
    handlerDelExercise: (id: number) => void,
}

export const ExerciseEditWorkoutModal: React.FC<ExerciseModalProps> = ({ exercise, handlerDelExercise} ) => {

    return (
        <tr className={styles.wrapper}>
            <td>{exercise.name}</td>
            <ExerciseCounter key={exercise.id} exercise={exercise} />
            <MyButton onClick={()=>handlerDelExercise(exercise.id)}>del</MyButton>
        </tr>
    )
}
