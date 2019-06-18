import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

import Header from './components/Header/header';
import Notes from './components/Notes/notes';
import Tags from './components/Tags/tags';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Header />
          
          <Route exact path='/' component={Notes} />
          <Route path='/notes' component={Notes} />
          <Route path='/tags' component={Tags} />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
