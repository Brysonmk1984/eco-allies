import React from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import './assets/scss/styles.scss';
import 'materialize-css/dist/css/materialize.css'
import './assets/scss/materialExtended.scss';
import 'materialize-css/dist/js/materialize.js'

class App extends React.Component {
 
  render() {
    return (
        <div>
            <Header />
            <Content />
            <Footer />
        </div>
    );
  }
}
export default App;