import React, {Component} from 'react';
import Axios from 'axios';
import BooksDetailsComponent from '../../components/books/details-component';

const parser = require('xml-js');


class BooksDetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: null
        }
        this.getDetails();
    }

    getDetails = () => {
    
        Axios.get(`https://www.goodreads.com/book/show/${this.props.match.params.id}.xml?key=mtABNCVqWBMWCFIiLz83iw`)
          .then((resp) => {
            const xmlDoc = JSON.parse(parser.xml2json(resp.data, { compact: true, spaces: 4 }));
            console.log(xmlDoc.GoodreadsResponse.book);
            this.setState({book: xmlDoc.GoodreadsResponse.book});
          });
      }

    render(){
        return(
            <BooksDetailsComponent book={this.state.book} />
        )
    }
}

export default BooksDetailsContainer