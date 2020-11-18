import { Component } from 'react';
import Header from './components/Header';
import Home from './pages/Home';

class App extends Component {

  render(){
    return (
      <div className="app">
        <Header/>
        <Home/>
      </div>
    );
  }

}

export default App;
