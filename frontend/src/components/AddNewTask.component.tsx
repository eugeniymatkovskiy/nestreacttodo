import { useContext, useState } from "react"
import ToDoContext from "../context/ToDo.context"

export default function AddNewTask () {
  const { tasks, updateTasks } = useContext(ToDoContext);
  const [isInvalid, setIsInvalid] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  function onHandleChange(e: any) {
    setTaskTitle(e.target.value);
  }

  function hundleSuccess(createdTask: any) {
    updateTasks([...tasks, createdTask]);
    setIsInvalid(false);
  }
  
  function handleSubmit(event: any) {
    event.preventDefault();
    setTaskTitle('');

    fetch(`/todo`, {
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle })
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 201) {
          setIsInvalid(false);
          return resp.json()
        } else {
          setIsInvalid(true);
        }
      }).then(createdTask => createdTask ? hundleSuccess(createdTask) : setIsInvalid(true))
  }

  return <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center mb-4">
    <div className="form-outline flex-fill">
      <input type="text" value={taskTitle} className={`form-control form-control-lg ${isInvalid ? 'is-invalid' : ''}`}
        onChange={onHandleChange} />
      <label className="form-label" htmlFor="form3">What do you need to do today?</label>
      <div className="invalid-feedback">
        Task wasn't created
      </div>
    </div>
    <button type="submit" className="btn btn-primary btn-lg ms-2 submit-btn">Add</button>
  </form>
}
