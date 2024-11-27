import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IDateSetup {
    dateState: string | null,
}

const dateSetup: IDateSetup = {
  dateState: null,
}

export const DateSetupSlice = createSlice({
    name: 'dateSetup',
    initialState: dateSetup,
    reducers: {
        setDate:((state, {payload}:PayloadAction<string | null> )=>{
            state.dateState = payload
        }),
        deleteDate:((state )=>{
            state.dateState = ''
        }),
    },
})

export const {
    setDate,
    deleteDate
} = DateSetupSlice.actions

export default DateSetupSlice.reducer
