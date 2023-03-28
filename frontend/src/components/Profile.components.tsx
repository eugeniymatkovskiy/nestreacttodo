import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth.context";
import ToDoContext from "../context/ToDo.context";
import IUser from "../interfaces/IUser.interface";

export default function Profile(props: {user: IUser}) {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const { updateTasks } = useContext(ToDoContext);

  function logout(event: any) {
    event.preventDefault();

    fetch('/auth/logout', {
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' }    
    }).then((resp) => {
      if (resp.status === 200 || resp.status === 201) {
        setIsAuthenticated(false);
        setUser(null);
        updateTasks([]);
        
        navigate('/');
      }
    });
  }
  console.log('props.user: ', props)
  return <div>
      <span>{props.user.name}</span>
      <i style={{marginLeft: '10px'}} className="bi bi-person-circle fa-2x"></i>
      <button type="button" style={{marginLeft: '10px'}} 
        className="btn btn-outline-danger me-2" onClick={logout}>Log out</button>
    </div>;
}
