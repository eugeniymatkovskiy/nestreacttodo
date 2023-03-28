import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login.component';
import Register from './components/auth/Register.component';
import Footer from './components/Footer.component';
import Header from './components/Header.component';
import Main from './components/Main.component';
import { AuthProvider } from './context/Auth.context';
import { ToDoProvider } from './context/ToDo.context';

function App() {
  // @ts-ignore
  return <AuthProvider> <ToDoProvider> 
        <Header />
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>
        <Footer />
    </ToDoProvider> </AuthProvider>;
}

export default App;
