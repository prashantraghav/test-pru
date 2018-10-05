import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import BooksListContainer from './containers/books/list-container';
import BooksDetailsContainer from './containers/books/details-container';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link className="navigation" to="/books">Books</Link>

          <Switch>
            <Route path="/books" exact component={BooksListContainer} />
            <Route path="/books/:id" exact component={BooksDetailsContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
