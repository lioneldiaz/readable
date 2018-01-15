import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListCategories from './Category/ListCategories'
import ListPosts from './Post/ListPosts'
import { generateKey } from '../Util/helpers'
import CreatePost from './Post/CreatePost'
import DetailsPost from './Post/DetailsPost'
import '../App.css'

class App extends Component { 
  render(){
    return(
      <div className="container">
        <Route exact path="/" render={() => (
          [ 
            <ListCategories key={generateKey()} />,
            <ListPosts key={generateKey()} />
          ]
        )}/>
        <Route exact strict path="/posts/:id" render={(match) => (
          <CreatePost edit={true} {...match}/>
        )}/>       
        <Route exact strict path="/createPost" render={(match) => (
          <CreatePost
            edit={false}
            {...match}
          />
        )}/>
        <Route exact strict path="/:category/:id" render={(match) => (
          <DetailsPost 
            {...match}
          />
        )}/>      
      </div>
    )
  }
}
export default App;
