import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';
import { useSelector } from 'react-redux';

function App() {
  const {user} = useSelector((state) => state.auth)
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={user ? <CreatePost /> : <Navigate to={'/login'} />} />
        <Route path='/details/:id' element={user ? <PostDetails /> : <Navigate to={'/login'} />} />
        <Route path='/edit/:id' element={user ? <EditPost /> : <Navigate to={'/login'} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
