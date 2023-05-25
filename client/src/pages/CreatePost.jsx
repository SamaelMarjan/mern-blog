import React, { useState } from 'react'

const CreatePost = () => {
  const categories = [
    'select', 'all', 'digital', 'artificial', 'design', 'places', 'tools', 'technology'
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

  return (
    <div className='container mt-5 create'>
      <form>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost