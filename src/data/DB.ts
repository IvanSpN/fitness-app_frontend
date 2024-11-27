export interface exercisesListItem {
    id: number
    name: string
    config: {
        sets: number | string | null
        weight?: number | string | null
        extraWeight?: number | string | null
        numberRepetitions: number | string | null
    }
}

const exercisesList: exercisesListItem[] = [
    {
        id: 1,
        name: 'Отжимания',
        config: {
            sets: null,
            weight: null,
            extraWeight: null,
            numberRepetitions: null,
        },
    },

    {
        id: 2,
        name: 'Приседания',
        config: {
            sets: null,
            weight: null,
            extraWeight: null,
            numberRepetitions: null,
        },
    },

    {
        id: 3,
        name: 'Становая тяга',
        config: {
            sets: null,
            weight: null,
            extraWeight: null,
            numberRepetitions: null,
        },
    },

    {
        id: 4,
        name: 'Жим лежа',
        config: {
            sets: null,
            weight: null,
            extraWeight: null,
            numberRepetitions: null,
        },
    },
]

export default exercisesList
