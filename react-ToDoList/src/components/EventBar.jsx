import { useCallback } from "react";
import AddEventButton from "./AddEventButton";
import './event.css'

const EventBar = ({ events, setEvents, currentEvent, setCurrentEvent }) => {

  /*
  useCallback 是 React 的一个 Hook，用于性能优化。

  如果直接写一个普通函数：
  每次组件重新渲染时，都会创建一个新的函数实例。这可能导致：
    子组件不必要的重新渲染，useEffect 重复执行，性能问题
  */
  const handleAdd = useCallback(() => {
    console.log('AddEvent');
    const title = prompt('Enter the Title:');
    //  find() 方法需要一个回调函数作为参数来判断元素是否符合条件。
    if (events.find((event) => event.title === title)) {
      alert('Duplicated Event!'); return;
    }

    if (title) {
      setEvents((event) => [
        ...event,
        {
          title,
          ['To do']: [],
          ['In progress']: [],
          ['Completed']: [],
        }

      ])
    }
  }, [events, setEvents])
  /* 
  为什么不能无依赖项
  如果使用空依赖项 []，会有一个问题：
  
  函数内部使用了 events 变量
  导致闭包陷阱，函数永远记住的是创建时的 events 值
  后续 events 更新时，函数内部仍然使用旧的 events 值
  */
  /* 
  关键点：
  useCallback 的依赖项是用来告诉 React 什么时候需要重新创建函数
  如果函数内部使用了外部变量，这些变量必须在依赖项中
  使用函数式更新可以减少依赖项
  空依赖项意味着函数永远记住创建时的状态
  */

  return (
    <div className="event-bar">
      <h1 className="event-bar-title">.kanban</h1>
      <AddEventButton handleClick={handleAdd} />
      <div className="event-container">
        {events.map((item) => (
          <div
            key={item.title}
            className={`event over-hide ${currentEvent.title === item.title ? 'selected-event' : ''}`}
            onClick={() => setCurrentEvent(item)}
          >
            {item.title}
          </div>
        ))
        }
      </div>
    </div>
  )
}
export default EventBar;