import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ListCategories from './Category/ListCategories'
import ListPosts from './Post/ListPosts'
import CategoryByPosts from './Category/CategoryByPosts'
import { generateKey } from '../Util/helpers'
import CreatePost from './Post/CreatePost'
import DetailsPost from './Post/DetailsPost'
import '../App.css'
import Error404 from './Error/Error404';

class App extends Component {
 
  render(){
    return(
      <div className="container">
      <Switch>
        <Route exact path="/" render={(match) => (
          [ 
            <ListCategories key={generateKey()} />,
            <ListPosts key={generateKey()} {...match}/>
          ]
        )}/>
        <Route exact path="/posts/edit/:id" render={(match) => (
          <CreatePost edit={true} {...match}/>
        )}/>       
        <Route exact path="/new/post/create" render={(match) => (
          <CreatePost
            edit={false}
            {...match}
          />
        )}/>
        <Route exact path="/:category/:post_id" render={(match) => (
          <DetailsPost
            {...match}
          />
        )}/>
        <Route exact path="/:category" render={(match) => (
          <CategoryByPosts
            {...match}
          />
        )}/>
        <Route component={()=><Error404 />}/>
      </Switch>
      </div>
    )
  }
}
export default App;
