import React from 'react'
import QuizActionBar from './components/QuizActionBar/QuizActionBar'
import QuizHome from './components/QuizHome/QuizHome'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RoadMap from './components/RoadMap/RoadMap'

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/quiz' element = {
            <>
              <QuizActionBar />
              <QuizHome />
            </>
          } />
          <Route path='/roadmap' element = {<RoadMap></RoadMap>} />
        </Routes>
      </Router>
  )
}

export default App
