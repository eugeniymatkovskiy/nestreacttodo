import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth.context";
import ToDoContext from "../../context/ToDo.context";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const { updateTasks } = useContext(ToDoContext);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    isAuthenticated && navigate('/');
  })

  function handleSubmit(event: any) {
    event.preventDefault()

    fetch('/auth', {
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: event.currentTarget.elements.email.value,
        password: event.currentTarget.elements.password.value,
      })    
    }).then((resp) => {
      if (resp.status === 200) {
        return resp.json();
      } else {
        setIsInvalid(true);
        return;
      }
    }).then(user => {
      if (!user) {
        setIsInvalid(true);
        return;
      }

      setUser(user);
      setIsAuthenticated(true);
      setIsInvalid(false);

      fetch('/todo')
        .then((r) => r.json())
        .then((json) => {
          updateTasks(json)
          
          navigate('/');
        });
    }).catch(err => {
      setIsInvalid(false);
    })
  }

  return  <section>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">

        <div className="card">
          <div className="card-body p-5">
            <h6 className="mb-3">Please Log In</h6>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className={`form-control ${isInvalid ? 'is-invalid' : ''}`} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                <div className="invalid-feedback">
                  Wrong credentials
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className={`form-control ${isInvalid ? 'is-invalid' : ''}`} id="password" placeholder="Password" />
                <div className="invalid-feedback">
                  Wrong credentials
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
  </section>
}
