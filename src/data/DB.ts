export interface exercisesListItem {
    id: number
    name: string
    config: {
        sets: number
        reps: number
        weight?: number
        extraWeight?: number
    }
}

const exercisesList: exercisesListItem[] = [
    {
        id: 1,
        name: 'Отжимания',
        config: {
            sets: 1,
            reps: 1,
            weight: 0,
            extraWeight: 0,
        },
    },

    {
        id: 2,
        name: 'Приседания',
        config: {
            sets: 1,
            reps: 1,
            weight: 0,
            extraWeight: 0,
        },
    },

    {
        id: 3,
        name: 'Становая тяга',
        config: {
            sets: 1,
            reps: 1,
            weight: 0,
            extraWeight: 0,
        },
    },

    {
        id: 4,
        name: 'Жим лежа',
        config: {
            sets: 1,
            reps: 1,
            weight: 0,
            extraWeight: 0,
        },
    },
]

export default exercisesList
