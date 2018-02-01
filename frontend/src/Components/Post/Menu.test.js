import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Menu from '../Post/Menu'

configure({adapter: new Adapter()})

describe('render <Menu />', () => {
  let wrapper = shallow(<Menu />)

  it ('should render <Menu />', () => {    
    expect (wrapper).toEqual(wrapper)
  })
  it('should handle typeMenu === postMenu', () => {
    wrapper.setProps({typeMenu: 'postMenu'})
    expect (wrapper).toEqual(wrapper)
  })
  it('should handle typeMenu === commentMenu', () => {
    wrapper.setProps({typeMenu: 'commentMenu'})
    expect (wrapper).toEqual(wrapper)
  })
})