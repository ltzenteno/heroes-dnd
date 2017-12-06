import React, {Component} from 'react';
import { render } from 'react-dom';
import Detail from './hero/containers/Detail';

class App extends Component {
  render(){
    return(
      <div>
       <Detail/>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
