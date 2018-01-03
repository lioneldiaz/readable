import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'
import { generateKey } from '../Util/helpers'
import CreatePost from './CreatePost'
import '../App.css'

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
        <Route path="/createPost" render={() => (
          <CreatePost />
        )}/>       
      </div>
    )
  }
}
export default App;
