import React, {Component} from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Detail from './hero/containers/Detail';

const store = configureStore();

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <div>
          <Detail/>
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app'));
