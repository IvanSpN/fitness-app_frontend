import { Route, Routes } from 'react-router-dom'


import './styles/index.scss'
import { Home } from './pages/Home'
import { Constructor } from './pages/Constructor'
import { Statistics } from './pages/Statistics'
import { MainLayouts } from './layouts/MainLayouts'
import { Workouts } from './pages/Workouts'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayouts />}>
          <Route index element={<Home/>}/>
          <Route path='/constructor' element={<Constructor />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/workouts' element={<Workouts />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
