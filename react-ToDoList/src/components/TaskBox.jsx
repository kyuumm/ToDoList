import { useCallback } from "react";
import Column from "./Column";
import { DragDropContext } from 'react-beautiful-dnd';



const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {

  const handleRemove = useCallback(() => {
    console.log('remove');

  }, [events, setEvents, currentEvent, setCurrentEvent])

  const handleDragEnd = useCallback(() => {
    console.log('drag end');

  }, [events, setEvents, currentEvent, setCurrentEvent])

  return (
    <div className="task-box">
      <header className="task-box-header">
        <h1 className="task-box-title">{currentEvent.title}</h1>
        <button className="remove-button" onClick={handleRemove}>Remove Event</button>
      </header>

      <DragDropContext onDragEnd={(result) => { handleDragEnd(result) }}>
        <div className="task-box-body">
          {
            ['To do', 'In progress', 'Completed'].map(item => (
              <Column
                key={item}
                tag={item}
                events={events}
                setEvents={setEvents}
                currentEvent={currentEvent}
              />
            ))
          }
        </div>
      </DragDropContext>

    </div>
  )
}
export default TaskBox;