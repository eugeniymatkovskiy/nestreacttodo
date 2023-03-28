import { useContext } from 'react';
import ToDoContext from '../context/ToDo.context';
import ITask from '../interfaces/ITask.interface';
import Task from './Task.component';

export default function ListOfTasks() {
  const { tasks } = useContext(ToDoContext);
  return <ul className="list-group mb-0">
    {tasks.length ? tasks.map((task: ITask, ind: number) => <Task key={task.id} data={task} /> ): <></>}
  </ul>
}
