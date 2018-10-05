import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const getValue = (props, key) => {
    return props.book[key]._cdata || props.book[key]._text
}

const getHtml = (props, key) => {
    return { __html: props.book[key]._cdata || props.book[key]._text }
}

const showDetails = (props) => {
    const url = new URLSearchParams(window.location.search);
    const returnQuery = url.get('returnQuery');
    
    return (
        <div className="bookDetails">
            <img alt="bookImg" src={getValue(props, 'image_url')} />
            <div className="details">
                <h1 className="name">{getValue(props, 'title')}</h1>
                <div className="desc" dangerouslySetInnerHTML={getHtml(props, 'description')} />
                <p className="ratings"><b>Ratings:</b> {getValue(props, 'average_rating')}</p>
            </div>
            <Link className="link" to={`/books?query=${returnQuery}`}>Back to search</Link>
        </div>
    )
}

const showList = (props) => {
    return (
        <div className="book">
            <img alt="book" src={getValue(props, 'image_url')} />
            <div className="name">{getValue(props, 'title')}</div>
        </div>
    )
}

const BooksDetailsComponent = (props) => {

    return (
            props.book && (props.listView ? showList(props) : showDetails(props))
    )
}

export default BooksDetailsComponent