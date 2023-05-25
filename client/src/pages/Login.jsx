import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [input, setInput] = useState({
    email:'',
    password:''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }
  
  return (
    <div className='container mt-5 login'>
      <form>
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
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login