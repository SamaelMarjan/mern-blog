import React from 'react'
import { Link } from 'react-router-dom'
import {MdOutlinePageview} from 'react-icons/md'
import {AiFillLike} from 'react-icons/ai'

const Categories = () => {
  const categories = [
    'all', 'digital', 'artificial', 'design', 'places', 'tools', 'technology'
  ]
  return (
    <div className='categories container'>
      <div className='category'>
        {
          categories.map((category, id) => (
            <div key={id} className='category-field'>
              {category}
            </div>
          ))
        }
      </div>
      <div className='card-style'>
        <div className="card" style={{width: '18rem'}}>
          <img src="images/image one.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <div className='titleAndAuthor'>
              <h5 className="card-title">Card title</h5>
              <span>Author: Samael</span>
            </div>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <div className='likeViewButton'>
              <div className='likeView'>
                <MdOutlinePageview size={30} /> 20
                <AiFillLike size={25} /> 1
              </div>
              <Link className="btn btn-primary" to={'/details/:id'}>View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories