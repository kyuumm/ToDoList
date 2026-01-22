import Task from "./Task";
import AddTaskButton from "./AddTaskButton";
import { Draggable, Droppable } from "react-beautiful-dnd";
import uuid from 'react-uuid'

const Column = ({ tag, currentEvent, events, setEvents }) => {

  const handleAdd = () => {
    console.log('add task');
    const name = prompt('Enter the task name');
    const details = prompt('Enter details');
    if (!(name && details)) { return; }

    setEvents((item) => {
      const arrCopy = [...item];
      const index = item.findIndex((event) => event.title == currentEvent.title)

      //获取当前选中事件的引用 
      const eventCopy = arrCopy[index];

      //使用splice替换数组中的元素 
      arrCopy.splice(index, 1, {
        ...eventCopy,
        [tag]: [
          ...eventCopy[tag],
          {
            name: name, id: uuid(), details: details
          }
        ]
      })
      // // 同步更新currentEvent状态
      // setCurrentEvent(arrCopy[index]);

      return arrCopy
    })

  }
  const handleRemove = (id, e) => {

    // 禁止冒泡到上层:修改task
    e.stopPropagation();

    console.log('remove');
    console.log(id);

    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          /* const taskList = event[tag];
          const index = taskList.findIndex((item) => item.id === id);
          taskList.splice(index, 1);
          return { ...event, [tag]: [...taskList] }; */
          return {
            ...event,
            [tag]: event[tag].filter(item => item.id !== id)
          };


        } else {
          return event;
        }
      })
    )


  }
  const handleUpdate = (id) => {
    console.log('update');



  }

  return (
    <div className="column">
      {tag}
      <AddTaskButton handleClick={handleAdd} />
      <Droppable droppableId={tag}>
        {/* Droppable组件定义可放置区域 */}
        {
          (provided, snapshot) => {
            return (
              /* 不懂 */
              <div
                className="task-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              /* 不懂 */
              >
                {/* Draggable组件定义可拖拽元素 */}
                {
                  events.find((event) => event.title === currentEvent.title)?.[tag].map((item, index) => (

                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {
                        (provided, snapshot) => (
                          <Task
                            name={item.name}
                            details={item.details}
                            id={item.id}
                            provided={provided}
                            snapshot={snapshot}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                          />
                        )}
                    </Draggable>
                  ))
                }


              </div>
            )
          }
        }

      </Droppable>
    </div>
  )
}

export default Column