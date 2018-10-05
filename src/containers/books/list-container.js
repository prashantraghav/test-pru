import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import BooksDetailsComponent from '../../components/books/details-component';

const parser = require('xml-js');

class BooksListContainer extends Component {
    constructor(props) {
        super(props);
        this.query = '';
        this.state = {
            books: null
        }
        this.onLoad();
    }

    onLoad = () => {
        const url = new URLSearchParams(window.location.search)
        const query = url.get('query');
        if(query)
            this.getBooksList(query);
    }

    getBooksList = (name='') => {
        const query = name || this.text.value;
        this.query = query;
        Axios.get(`https://www.goodreads.com/search/index.xml?key=mtABNCVqWBMWCFIiLz83iw&q=${query}`)
            .then((resp) => {
                const xmlDoc = JSON.parse(parser.xml2json(resp.data, { compact: true, spaces: 4 }));
                console.log(xmlDoc);
                this.setState({ books: xmlDoc.GoodreadsResponse.search.results.work });
            });
    }



    render() {
        return (
            <div className="bookList" >
                <input type="text" ref={(node) => this.text = node}/>
                <button type="submit" onClick={()=>this.getBooksList()}>Search</button>
                {
                    this.state.books &&
                    <div className="bookListItems">
                        {
                            this.state.books.map((book) =>
                                <div className="bookItem" dataid={book.best_book.id._text}>
                                    <BooksDetailsComponent book={book.best_book} listView={true}  />
                                    <Link className="link" to={`/books/${book.best_book.id._text}?returnQuery=${this.query}`}>See More</Link>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        )
    }
}

export default BooksListContainer;