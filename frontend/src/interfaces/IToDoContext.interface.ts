import ITask from "./ITask.interface";

export default interface IToDoContext {
  tasks: ITask[];
  updateTasks: (tasks: ITask[]) => void;
}
