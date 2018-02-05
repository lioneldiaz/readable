import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../Actions/categoryAction'
import * as typesCategory from '../../Constans/TextCategories'

class ListCategories extends Component {
  /**
   * @description Validate the props declared
   */
  static propTypes = {
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount () {
    this.props.categories.length === 0 && this.props.getCategories()
  }
  render(){
    const {categories}=this.props
    return(
      <div className="row">       
        {categories.map((category, index) => (          
          <div key={index} className="col-md-4">
            <div className="card text-center category-margin rd-box-category">
              <div className="rd-top-card-category" style={{backgroundColor:category.name==='react'?'#61DAFB':category.name==='redux'?'#7747BC':'#02B3E4'}}/>
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">
                  {category.name === 'redux' && typesCategory.reduxCategory}
                  {category.name === 'udacity' && typesCategory.udacityCategory}
                  {category.name === 'react' && typesCategory.reactCategory}
                </p>
                <div>
                  <Link 
                  className="btn-readable" 
                  style={{color: 'white', backgroundColor:category.name==='react'?'#61DAFB':category.name==='redux'?'#7747BC':'#02B3E4'}}
                  to={{
                    pathname:`/${category.name}`
                  }}
                  >
                  View Posts
                </Link>
                </div>
              </div>
            </div>
          </div>
        ))}                    
      </div>
    )
  }
}
/**
 * @description Specify which data from the store you passed to your React component
 * @param {Object} categories
 * @return {Object}
 */
function mapStateToProps ({categories}) {
  return {
    categories: Object.keys(categories).map(key => categories[key])
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories(dispatch))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)