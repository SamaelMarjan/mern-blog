import axios from 'axios'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { MdArrowBack } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()
  const {user, token} = useSelector((state) => state.auth)
  const categories = [
    'select', 'digital', 'artificial', 'design', 'places', 'tools', 'technology'
  ]

  const [input, setInput] = useState({
    title:'',
    category:'',
    image:'',
    desc:''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value, type, files} = e.target
    const inputValue = type === 'file' ? files[0] : value
    setInput({...input, [name] : inputValue})
  }

  //create blog
  const createPost = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/blog/create', input, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type" : "multipart/form-data"
        }
      })
      console.log(data);
      toast.success(data.message)
      if(data.success === true) {
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong")
    }
  }

  return (
    <div className='container mt-5 create'>
      <Toaster />
      <div className='navigateBack' onClick={() => navigate(-1)}> <MdArrowBack size={20} style={{marginLeft: '15px'}} /> Back</div>
      <form className='mt-2'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title"
                 name='title' value={input.title} onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id='category'
                  name='category' value={input.category} onChange={handleChange}
          >
            {
              categories.map((category, id) => (
                <option key={id} >
                  {category}
                </option>
              ))
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input type="file" className="form-control" id="image"
                 name='image' accept='images/*' onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="desc"
                    name='desc' value={input.desc} onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={createPost} >Submit</button>
      </form>
    </div>
  )
}

export default CreatePost