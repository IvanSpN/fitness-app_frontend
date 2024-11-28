import { useState } from 'react';
import { useAppSelector } from '../../shared/Redux/hooks';
import MyModal from '../UI/modal/MyModal';
import { Workout } from './Workout';

import styles from './WorkoutsList.module.scss'

export const WorkoutsList = () => {
    const [isModalOpen, setModalOpen] = useState(true);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const { workouts } = useAppSelector(state => state.workoutsList)

    const soretdWorkouts = [...workouts].sort((a, b) => (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0));

    return (
        <>
            <div className={styles.wrapper}>
                {soretdWorkouts.length > 0 ? soretdWorkouts.map((workout) => <Workout key={workout.id} date={workout.date} id={workout.id} exercises={workout.exercises} />) : 'Почему то список тренировок пуст. Немедленно добавьте тренировки!'}

            </div>
            <MyModal isOpen={isModalOpen} onClose={closeModal}>
                <p>This is the modal content!</p>
                <p>You can add any content here, including forms, buttons, or text.</p>
            </MyModal>
        </>
    )
}
