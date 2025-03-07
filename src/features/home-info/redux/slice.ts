import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INewWorkout } from '../../display-list-workout/redux/slice'

interface IHomeInfoInitialState {
    todayWorkout: INewWorkout | null
    tomorrowWorkout: INewWorkout | null
}

const homeInfoInitialState: IHomeInfoInitialState = {
    todayWorkout: null,
    tomorrowWorkout: null,
}

export const homeInfoSlice = createSlice({
    name: 'homeINfo',
    initialState: homeInfoInitialState,
    reducers: {
        setTodayWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
            state.todayWorkout = payload
        },
        setTomorrowWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
            state.tomorrowWorkout = payload
        },
    },
})

export const { setTodayWorkout, setTomorrowWorkout } = homeInfoSlice.actions

export default homeInfoSlice.reducer
