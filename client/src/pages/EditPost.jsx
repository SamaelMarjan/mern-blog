import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { MdArrowBack } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const categories = [
    'select', 'all', 'digital', 'artificial', 'design', 'places', 'tools', 'technology'
  ]
  const {user, token} = useSelector((state) => state.auth)

  const [input, setInput] = useState({
    title:'',
    category:'',
    image:'',
    desc:''
  })

  const handleChange = (e) => {
    //console.log(e.target.value);
    const {name, value, type, files} = e.target
    const inputValue = type === 'file' ? files[0] : value
    setInput({...input, [name] : inputValue})
  }

  useEffect(() => {
    const editHandle = async() => {
      try {
        const {data} = await axios.get(`https://mern-blog-hk4p.onrender.com/blog/get/${id}`)
        console.log(data);
        toast.success(data.message)
        setInput(data.blog)
      } catch (error) {
        console.log(error);
        toast.error('Something wrong')
      }
    }
    editHandle()
  }, [id])

  //update
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`https://mern-blog-hk4p.onrender.com/blog/edit/${id}`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type" : "multipart/form-data"
        }
      })
      console.log(data);
      toast.success(data.message)
      // if(data.success === true) {
      //   navigate('/')
      // }
      setInput(data.blog)
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }

  return (
    <div className='container mt-5 edit'>
      <Toaster />
      <div className='navigateBack' onClick={() => navigate(-1)}> <MdArrowBack size={20} style={{marginLeft: '15px'}} /> Back</div>
      <form className='mt-2' onSubmit={handleUpdate}>
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
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default EditPost