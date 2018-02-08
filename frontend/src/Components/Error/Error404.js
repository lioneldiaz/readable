import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'

const Error404 = () => {
  return (
  <div className="row">
    <div className="col-md-12">
      <Link className="rd-close-create-post" to="/"/>
      <div className="rd-error-404-title rd-error-404-text ">
        <h2>Sorry</h2>
        <h3>404 The page can not be found</h3>
      </div>
      <div className="rd-error-404-body">
        <p>
          We can not find the page you are looking for.
        </p>
      </div>
    </div>
  </div>
  )
}
export default Error404