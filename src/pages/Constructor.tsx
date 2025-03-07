import { CreateWorkout } from '../features/create-workout'

import '../styles/_constructor.scss'

export const Constructor = () => {

    return (
        <div className='constructor-wrapper'>
            <div className='constructor'>
                <CreateWorkout />
            </div>
        </div>
    )
}
