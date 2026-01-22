import { useEffect, useState, useMemo, useCallback } from 'react'
import './App.css'
import './components/event.css';
import './components/task.css'
import TaskBox from './components/TaskBox'
import EventBar from './components/EventBar'

function App() {

  const initEvent = useMemo(() => [
    {
      title: 'Add a new Event',
      ['To do']: [],
      ['In progress']: [],
      ['Completed']: [],
    },
    /* useMemo的第二个参数是空数组[]，
    表示这个值只需要在组件首次渲染时计算一次，之后不会再重新计算
     避免了每次组件重新渲染时都创建一个新的数组对象，可以提高性能
     
     特别适合用于初始化数据，因为初始化数据通常只需要创建一次，
     不需要随着组件的重新渲染而重复创建。*/
  ], [])

  const [events, setEvents] = useState(() => {
    return localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : initEvent;
  })
  /* 
  JSON.parse 用于将JSON格式的字符串转换为JavaScript对象
  */

  // const [currentEvent, setCurrentEvent] = useState(events[0]);
  const [currentEvent, setCurrentEvent] = useState(() => {
    const storedEvents = localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : initEvent;
    return storedEvents[0] || initEvent[0];
  });


  const updateEvents = useCallback(async () => {
    console.log('update the events');
    if (!events.length) {
      await localStorage.setItem('events', JSON.stringify(initEvent));
      setEvents(initEvent);
    } else {
      await localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events])
  /* 
  useCallback返回一个记忆化的回调函数，该函数只有在某个依赖项改变时才会更新
  JSON.stringify用于将JavaScript对象转换为JSON字符串
  
  */


  //当事件更新，就调用updateEvents
  useEffect(() => {
    updateEvents();
  }, [events])

  return (
    <div className='App'>
      <EventBar events={events} setEvents={setEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />
      <TaskBox events={events} setEvents={setEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />
    </div>
  )
}

export default App
