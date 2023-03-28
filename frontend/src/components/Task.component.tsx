import { useContext, useState } from 'react';
import ToDoContext from '../context/ToDo.context';
import { default as TaskInt } from '../interfaces/ITask.interface';

export default function Task (props: { data: TaskInt }) {
  const { tasks, updateTasks } = useContext(ToDoContext);
  const [isDone, setIsDone] = useState<boolean>(props.data.isDone);
  
  const { id, title } = props.data
  
  const markAsDone = (id: number) => {
    if (isDone) return

    fetch(`/todo/done/${id}`, {
      method: 'PUT',  
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => {
        setIsDone(true);
      })
  }

  const removeTask = (id: number) => {
    fetch(`/todo/${id}`, {
      method: 'DELETE',  
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 201) {
          // @ts-ignore
          updateTasks([...tasks.filter(t => t.id !== id)])
        }
      })
  }

  return <li
    className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
    <div className="d-flex align-items-center">
      <input className="form-check-input me-2" type="checkbox" value="" 
        aria-label="..." checked={isDone ? true : false}
        onChange={() => markAsDone(id)}
        />
      {title}
    </div>
    <span onClick={() => {removeTask(id)}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
    </span>
  </li>
}
