import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'
import { generateKey } from '../Util/helpers'

class App extends Component { 
  render(){  
    return(
      <div>
        <Route exact path="/" render={() => (
          [ 
            <ListCategories key={generateKey()} />,
            <ListPosts key={generateKey()} />
          ]
        )}/>        
      </div>
    )
  }
}
export default App;
