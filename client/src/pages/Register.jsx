import React, { useState } from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

const Register = () => {
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

  return (
    <div className='container mt-5 register'>
      <form>
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
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  )
}

export default Register