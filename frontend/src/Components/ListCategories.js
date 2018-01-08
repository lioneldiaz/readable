import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategories } from '../Actions/categoryAction'

class ListCategories extends Component {
  /**
   * @description Validate the props declared
   */
  static propTypes = {
    categories: PropTypes.object.isRequired
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount () {
    this.props.categories.categories.length === 0 && this.props.getCategories()
  }
  render(){
    const { categories } = this.props
    return(
      <div>
        <h2 className="list-category-post">Categories</h2>
        <ul>
          {categories.categories.map((category, index) => (
            <li key={index}>
              {category.name}
            </li>
          ))}
        </ul>       
      </div>
    )
  }
}
/**
 * @description Specify which data from the store you passed to your React component
 * @param {Object} state - The current store state
 * @return {Object}
 */
function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch - Our specific props
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories(dispatch))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)