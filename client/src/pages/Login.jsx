import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  //const navigate = useNavigate()
  const [input, setInput] = useState({
    email:'',
    password:''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  //login user
  const loginUser = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('https://mern-blog-hk4p.onrender.com/auth/login', input)
      console.log(data);
      dispatch(login(data))
      toast.success(data.message)
    } catch (error) {
      console.log(error);
      toast.error('Somethin wrong')
    }
  }
  
  return (
    <div className='container mt-5 login'>
      <Toaster />
      <form onSubmit={loginUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"
                 name='email' value={input.email} onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
                 name='password' value={input.password} onChange={handleChange}
          />
        </div>
        <div>Forgot password? <Link>Click</Link> here to reset.</div>
        <div>Don't have an account? Please <Link to={'/register'}>register</Link>. </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login