import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth.context";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [isInvalid, setIsInvalid] = useState(false);

  function handleSubmit(event: any) {
    event.preventDefault();

    fetch('/auth/register', {
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: event.currentTarget.elements.userName.value,
        email: event.currentTarget.elements.email.value,
        password: event.currentTarget.elements.password.value,
      })    
    }).then((resp) => {
      if (resp.status === 200 || resp.status === 201) {
        return resp.json();
      } else {
        setIsInvalid(true);
        return null;
      }
    }).then(user => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        setIsInvalid(false);

        navigate('/');
      }

      setIsInvalid(true);
    }).catch(err => {
      setIsInvalid(true);
      console.log('err: ', err)
    })
  }

  return <section>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">

          <div className="card">
            <div className="card-body p-5">
              <h6 className="mb-3">Please Sign Up</h6>

              <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="userName">Your name</label>
                  <input type="text" className={`form-control ${isInvalid ? 'is-invalid' : ''}`} id="userName" aria-describedby="userHelp" placeholder="Enter your name" />
                  <div className="invalid-feedback">
                    Can't register new user
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className={`form-control ${isInvalid ? 'is-invalid' : ''}`} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                  <div className="invalid-feedback">
                    Can't register new user
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className={`form-control ${isInvalid ? 'is-invalid' : ''}`} id="password" placeholder="Password" />
                  <div className="invalid-feedback">
                    Can't register new user
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-success">Sign Up</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
    </section>
}
