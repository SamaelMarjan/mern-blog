import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {MdOutlinePageview} from 'react-icons/md'
import {AiFillLike} from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import './style.css'

const Categories = () => {
  const categories = [
    'all', 'digital', 'artificial', 'design', 'places', 'tools', 'technology'
  ]

  const [blogs, setBlogs] = useState([])
  const [filterBlogs, setFilterBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  //get all blogs
  const allBlogs = async() => {
    try {
      const {data} = await axios.get('https://mern-blog-hk4p.onrender.com/blog/get')
      console.log(data);
      toast.success(data.message)
      setBlogs(data.blog)
      setFilterBlogs(data.blog)
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }

  useEffect(() => {
    allBlogs()
  }, [])

  //filter categorywise
  useEffect(() => {
    if(activeCategory === 'all') {
      setFilterBlogs(blogs)
    } else {
      setFilterBlogs(() => {
        const filterBlogs = blogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLocaleLowerCase())
        return filterBlogs
      })
    }
  }, [activeCategory, blogs])

  return (
    <div className='categories container'>
      <Toaster />
      <div className='category'>
        {
          categories.map((category, id) => (
            <div key={id} className={`category-field ${activeCategory === category && 'active-cat'}`} onClick={() => setActiveCategory(category)}>
              {category}
            </div>
          ))
        }
      </div>
        {
          filterBlogs?.length > 0 ? <>
          <div className='card-style'>
            {
              filterBlogs?.map((blog) => (
                <div key={blog?._id} className="card card-body-tag" style={{width: '18rem'}}>
                  <img src={`https://mern-blog-hk4p.onrender.com/blog/${blog?.image}`} className="card-img" alt={blog?.title} />
                  <div className="card-body">
                    <div className='titleAndAuthor'>
                      <h5 className="card-title">{blog?.title}</h5>
                      <span>Author: {blog?.userId?.username}</span>
                    </div>
                    <p className="card-text">{blog?.desc}</p>
                    <div className='likeViewButton'>
                      <div className='likeView'>
                        <MdOutlinePageview size={30} /> {blog?.views}
                        <AiFillLike size={25} /> {blog?.likes?.length}
                      </div>
                      <Link className="btn btn-primary" to={`/details/${blog?._id}`}>View</Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          </> : <>
            <h3>No blogs</h3>
          </>
        }
        
    </div>
  )
}

export default Categories