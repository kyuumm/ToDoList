import { useCallback } from "react";
import Column from "./Column";
import { DragDropContext } from 'react-beautiful-dnd';



const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {

  // remove event
  const handleRemove = useCallback(() => {
    console.log('remove event');
    if (confirm('confirm it')) {

      setEvents((prev) => {
        const result = prev.filter((item) => item.title !== currentEvent.title);
        if (!result.length) {
          const initEvent = {
            title: 'Add a new Event',
            ['To do']: [],
            ['In progress']: [],
            ['Completed']: [],
          }
          setEvents(initEvent);
        } else {
          setCurrentEvent(result[0]);
        }
        return result;
      })
    }

  }, [events, setEvents, currentEvent, setCurrentEvent])

  //task 拖动
  const handleDragEnd = useCallback((result) => {
    console.log('drag end');
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    console.log(result);
    console.log(draggableId);

    const taskCpy = currentEvent[source.droppableId][source.index];
    // console.log(taskCpy);


    setEvents((prev) =>
      prev.map((event) => {
        if (event.title !== currentEvent.title) { return event }

        let eventCpy = { ...event };
        /*         //remove
                const sourceTaskList = event[source.droppableId];
                sourceTaskList.splice(source.index, 1);
                eventCpy = { ...event, [source.droppableId]: sourceTaskList };
                //add
                const desTaskList = event[destination.droppableId];
                desTaskList.splice(destination.index, 0, taskCpy);
                eventCpy = { ...event, [destination.droppableId]: desTaskList }; 
                
                return eventCpy
                */

        const sourceTaskList = Array.from(event[source.droppableId]);
        const destList =
          source.droppableId === destination.droppableId
            ? sourceTaskList
            : Array.from(event[destination.droppableId]);

        const [movedTask] = sourceTaskList.splice(source.index, 1);

        destList.splice(destination.index, 0, movedTask);

        return {
          ...event,
          [source.droppableId]: sourceTaskList,
          [destination.droppableId]: destList
        }
      })
    )
  }, [currentEvent])

  return (
    <div className="task-box">
      <header className="task-box-header">
        <h1 className="task-box-title over-hide">{currentEvent.title}</h1>
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