import React, { Component } from 'react'
import * as categoriesAPI from '../Util/categoriesAPI'
import * as postsAPI from '../Util/postsAPI'

class App extends Component {
  constructor(){
    super();
    this.state = {
    
    }
  }
  componentDidMount(){    
   
  }
  render() {
    return (
      <div>
        <p className='App-intro'>
          Hello World !
        </p>
      </div>
    )
  }
}

export default App;
