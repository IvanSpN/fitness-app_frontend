export interface exercisesListItem {
    id: number
    name: string
    config: {
        sets: number
        weight?: number
        extraWeight?: number
        numberRepetitions: number
    }
}

const exercisesList: exercisesListItem[] = [
    {
        id: 1,
        name: 'Отжимания',
        config: {
            sets: 3,
            weight: 10,
            extraWeight: 10,
            numberRepetitions: 20,
        },
    },

    {
        id: 2,
        name: 'Приседания',
        config: {
            sets: 3,
            weight: 10,
            extraWeight: 10,
            numberRepetitions: 20,
        },
    },

    {
        id: 3,
        name: 'Становая тяга',
        config: {
            sets: 3,
            weight: 10,
            extraWeight: 10,
            numberRepetitions: 20,
        },
    },

    {
        id: 4,
        name: 'Жим лежа',
        config: {
            sets: 3,
            weight: 10,
            extraWeight: 10,
            numberRepetitions: 20,
        },
    },
]

export default exercisesList
