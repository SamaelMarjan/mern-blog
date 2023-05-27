import React, { useState } from 'react'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username:'',
    email:'',
    password:'',
    confirmpassword:''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  //create user
  const createUser = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('https://mern-blog-hk4p.onrender.com/auth/register', input)
      console.log(data);
      if(data.success === true) {
        navigate('/login')
      }
      toast.success(data.message)
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }

  return (
    <div className='container mt-5 register'>
      <Toaster />
      <form onSubmit={createUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" 
                 name='username' value={input.username} onChange={handleChange}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" 
                 name='confirmpassword' value={input.confirmpassword} onChange={handleChange}
          />
        </div>
        <div>Already have an account? Please <Link to={'/login'}>Login</Link></div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}

export default Register