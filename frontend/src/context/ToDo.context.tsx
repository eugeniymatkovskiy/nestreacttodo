import { createContext, FC, useContext, useEffect, useState } from 'react';
import ITask from '../interfaces/ITask.interface';
import IToDoContext from '../interfaces/IToDoContext.interface';
import AuthContext from './Auth.context';

const defaultState = {
  tasks: [],
  updateTasks: (tasks: ITask[]) => {}
};

const ToDoContext = createContext<IToDoContext>(defaultState);

export const ToDoProvider: FC<React.ReactNode> = ({ children }: any) => {
  const [tasks, updateTasks] = useState<ITask[]>([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && fetch('/todo')
    .then((r) => r.json())
    .then((json) => updateTasks(json));
  }, [isAuthenticated])

  return (
    <ToDoContext.Provider value={{
      tasks, updateTasks
    }}>
      {children}
    </ToDoContext.Provider>
  )
}

export default ToDoContext;


