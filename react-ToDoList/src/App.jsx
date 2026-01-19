import { useEffect, useState } from 'react'
import './App.css'
import TaskBox from './components/TaskBox'
import EventBar from './components/EventBar'

function App() {

  const [events, setEvents] = useState(() => {

  })

  const updateEvents = () => {
    console.log('update the events');

  }

  useEffect(() => {
    updateEvents();
  }, [events])

  return (
    <div>
      <EventBar />
      <TaskBox />
    </div>
  )
}

export default App
