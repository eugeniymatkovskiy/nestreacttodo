import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth.context';
import '../styles/Main.css';

import AddNewTask from './AddNewTask.component';
import ListOfTasks from './ListOfTasks.component';

export default function Main() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
    }
  })

  return <section>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">

          <div className="card">
            <div className="card-body p-5">
              <h6 className="mb-3">Awesome Todo List</h6>
                <AddNewTask  />
                <ListOfTasks />
            </div>
          </div>

        </div>
      </div>
    </div>
    </section>
}
