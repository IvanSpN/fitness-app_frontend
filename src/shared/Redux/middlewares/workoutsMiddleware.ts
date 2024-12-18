import { RootState } from '../store'

export const syncWorkoutsWithLocalStorage = (getState: () => RootState) => {
    const workoutsState = getState().displayListWorkout.workouts

    localStorage.setItem('workouts', JSON.stringify(workoutsState))

    // if (getState().auth.access_token) {
    //     localStorage.setItem('userWorkouts', JSON.stringify(WorkoutsState))
    // } else {
    //     localStorage.removeItem('userWorkouts')
    // }
}
export const loadWorkoutsFromLocalStorage = () => {
    const workoutsData = localStorage.getItem('workouts')
    return workoutsData ? JSON.parse(workoutsData) : []
}
