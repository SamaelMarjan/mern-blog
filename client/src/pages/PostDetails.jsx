import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { AiFillDelete, AiFillEdit, AiFillLike, AiFillTag, AiOutlineLike } from 'react-icons/ai'
import { MdArrowBack } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {user, token} = useSelector((state) => state.auth)
  const [blogData, setBlogData] = useState({})
  const [like, setLike] = useState(false)

  //get single blog data
  useEffect(() => {
    const singleBlog = async() => {
      try {
        const {data} = await axios.get(`https://mern-blog-hk4p.onrender.com/blog/get/${id}`)
        //console.log(data);
        toast.success(data.message)
        setBlogData(data.blog)
        setLike(data.blog.likes.includes(user._id))
        //console.log(data.blog.likes.includes(user._id));
      } catch (error) {
        console.log(error);
        toast.error('Something wrong')
      }
    }
    singleBlog()
  }, [id, user._id])

  //handle like
  const handleLike = async() => {
    try {
      const {data} = await axios.put(`https://mern-blog-hk4p.onrender.com/blog/like/${blogData._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      toast.success(data.message)
      //update likes
      const updateLikes = data.blog.likes
      setBlogData((prev) => ({
        ...prev,
        likes: updateLikes
      }))
      setLike((prev) => !prev)
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }

  //delete blog
  const handleDelete = async(id) => {
    try {
      const {data} = await axios.delete(`https://mern-blog-hk4p.onrender.com/blog/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(data.success === true) {
        navigate('/')
      }
      toast.success(data.message)
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }

  return (
    <div>
      <Toaster />
      <div className='container mt-3'>
      <div className='navigateBack' onClick={() => navigate(-1)}> <MdArrowBack size={20} style={{marginLeft: '15px'}} /> Back</div>
        {
          blogData && (
            <>
              <div className='blogData mt-2'>
                <div><AiFillTag /> {blogData?.category}</div>
                <img src={`https://mern-blog-hk4p.onrender.com/blog/${blogData?.image}`} alt={blogData?.title} />
                <div className='titleAndCOntrollers'>
                  <h3>
                    {blogData?.title}
                  </h3>
                  {
                    blogData?.userId?._id === user._id ? <>
                      <div className='editAndDelete'>
                        <Link to={`/edit/${blogData._id}`} className='edit-blog'>
                          <AiFillEdit size={30} />
                        </Link>
                        <div onClick={() => handleDelete(blogData._id)} className='delete'>
                          <AiFillDelete size={30} />
                        </div>
                      </div>
                    </> : <>
                    {like ? <>
                      <div className='likes'>
                        <AiFillLike size={30} onClick={handleLike}/>
                      </div>
                    </> : <>
                      <div className='likes'>
                        <AiOutlineLike size={30} onClick={handleLike}/>
                      </div>
                    </>}
                    </>
                  }
                </div>
              <div className='descANdLikes'>
                <p className='desc-crip'>
                  {blogData?.desc}
                </p>
                <div className='likesAndViews'>
                  <span>{blogData?.views} views</span>
                  <span>{blogData?.likes?.length} likes</span>
                </div>
              </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default PostDetails